const assert = require('assert');
const _ = require('lodash');
const app = require('../../mockup/app');
const levels = require('../../mockup/levels');
const users = require('../../mockup/users');
const groups = require('../../mockup/groups');
const activities = require('../../mockup/activities');
const Activity = app.model.Activity;
const Group = app.model.Group;
const User = app.model.User;
const Level = app.model.Level;
const Badge = app.model.Badge;
const promiseFor = require('../../utils/promiseFor');

/**
 * TODO: Test unhappy path
 */
describe("Badge Model", () => {

    it("should not have any elements", (done) => {
        Level.count().execute()
            .then((total) => {
                assert.equal(total, 0);
                return User.count().execute()
            })
            .then((total) => {
                assert.equal(total, 0);
                return Group.count().execute()
            })
            .then((total) => {
                assert.equal(total, 0);
                return Activity.count().execute()
            })
            .then((total) => {
                assert.equal(total, 0);
                return (new Level(levels.noob)).save();
            })
            .then((result)=> {
                levels.noob.id = result.id;
                return (new User(users.admin)).save();
            })
            .then((result)=> {
                users.admin.id = result.id;
                return (new Group(groups.noob)).save();
            })
            .then((result)=> {
                groups.noob.id = result.id;
                activities.firstAct.group = groups.noob;
                return (new Activity(activities.firstAct)).save();
            })
            .then((result)=> {
                activities.firstAct.id = result.id;
                done();
            })
            .catch(done);
    });
    it("should create an element", (done) => {
        var user = new Badge({
            user: users.admin,
            activity: activities.firstAct
        });

        user.saveAll()
            .then((result) => {
                assert.equal(result.activity.id, activities.firstAct.id);
                assert.equal(result.user.id, users.admin.id);

                done();
            })
            .catch(done);
    });
    it("should read all the elements", (done)=> {
        Badge.run()
            .then((result)=> {
                assert.equal(result.length, 1);

                assert.equal(result[0].activityID, activities.firstAct.id);
                assert.equal(result[0].userID, users.admin.id);
                done();
            })
            .catch(done);
    });

    it("should delete all elements", (done)=> {
        Badge.run()
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
                return User.run()
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
                return Activity.run()
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
                return Group.run()
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
                return Group.run();
            })
            .then((result)=> {
                assert.equal(result.length, 0);
                return Activity.run();
            })
            .then((result)=> {
                assert.equal(result.length, 0);
                done();
            })
            .catch(done);
    });
});