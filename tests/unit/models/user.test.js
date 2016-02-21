const assert = require('assert');
const _ = require('lodash');
const app = require('../../mockup/app');
const levels = require('../../mockup/levels');
const users = require('../../mockup/users');
const User = app.model.User;
const Level = app.model.Level;
const promiseFor = require('../../utils/promiseFor');

var userCheck, userCheckNot;

/**
 * TODO: Test unhappy path
 */
describe("User Model", () => {
    before(() => {
        userCheck = (result, expected) => {
            assert.equal(result.username, expected.username);
            //assert.equal(result.password, expected.password);
            assert.equal(result.email, expected.email);
            assert.equal(result.firstName, expected.firstName);
            assert.equal(result.lastName, expected.lastName);

            if(expected.isAdmin !== null && expected.isAdmin !== undefined)
                assert.equal(result.isAdmin, expected.isAdmin);
            if(expected.score !== null && expected.score !== undefined)
                assert.equal(result.score, expected.score);
            else
                assert.equal(result.score, 0);
        };
        userCheckNot = (result, expected) => {
            assert.notEqual(result.username, expected.username);
            //assert.notEqual(result.password, expected.password);
            assert.notEqual(result.email, expected.email);
            assert.notEqual(result.firstName, expected.firstName);
            assert.notEqual(result.lastName, expected.lastName);
        };
    });

    it("should not have any elements", (done) => {
        Level.count().execute()
            .then((total) => {
                assert.equal(total, 0);
                return User.count().execute()
            })
            .then((total) => {
                assert.equal(total, 0);

                return (new Level(levels.noob)).save();
            })
            .then((result)=> {
                levels.noob.id = result.id;
                done();
            })
            .catch(done);
    });
    it("should create an element", (done) => {
        var user = new User(users.admin),
            user2 = new User(users.normal);

        user.group = levels.noob;
        user2.group = levels.noob;

        user.save()
            .then((result) => {
                userCheck(result, users.admin);
                assert.equal(result.group.id, levels.noob.id);

                return user2.save();
            })
            .then((result) => {
                userCheck(result, users.normal);
                assert.equal(result.group.id, levels.noob.id);

                done();
            })
            .catch(done);
    });
    it("should read all the elements", (done)=> {
        User.run()
            .then((result)=> {
                for (var i in result)
                    userCheck(result[i], users[result[i].username]);

                assert.equal(result.length, 2);
                done();
            })
            .catch(done);
    });
    it("should update the element", (done)=> {
        User.filter({
                username: "normal"
            })
            .run()
            .then((result) => {
                assert.equal(result.length, 1);
                userCheck(result[0], users.normal);
                result[0].merge(users.frisco);

                return result[0].save();
            })
            .then((result) => {
                userCheckNot(result, users.normal);
                userCheck(result, users.frisco);
                done();
            })
            .catch(done);
    });
    it("should read all the elements", (done)=> {
        User.run()
            .then((result)=> {
                for (var i in result) {
                    userCheck(result[i], users[result[i].username]);
                    userCheckNot(result[i], users.normal);
                }

                assert.equal(result.length, 2);
                done();
            })
            .catch(done);
    });

    it("should delete all elements", (done)=> {
        User.run()
            .then((result)=> {
                return promiseFor(function (count) {
                    return count < result.length;
                }, function (count) {
                    return result[count].deleteAll()
                        .then(function (res) {
                            return ++count;
                        });
                }, 0)
            })
            .then(()=> {
                return Level.run()
                    .then((result)=> {
                        return promiseFor(function (count) {
                            return count < result.length;
                        }, function (count) {
                            return result[count].deleteAll()
                                .then(function (res) {
                                    return ++count;
                                });
                        }, 0)
                    })
            })
            .then(()=> {
                return Level.run();
            })
            .then((result)=> {
                assert.equal(result.length, 0);
                return User.run();
            })
            .then((result)=> {
                assert.equal(result.length, 0);
                done();
            })
            .catch(done);
    });
});