const assert = require('assert');
const _ = require('lodash');
const app = require('../../mockup/app');
const groups = require('../../mockup/groups');
const Group = app.model.Group;
const promiseFor = require('../../utils/promiseFor');

var groupCheck, groupCheckNot;

/**
 * TODO: Test unhappy path
 */
describe("Group Model", () => {
    before(() => {
        groupCheck = (result, expected) => {
            assert.equal(result.name, expected.name);
            assert.equal(result.score, expected.score);
            assert.equal(result.logo, expected.logo);
            assert.equal(result.description, expected.description);
        };
        groupCheckNot = (result, expected) => {
            assert.notEqual(result.name, expected.name);
            assert.notEqual(result.score, expected.score);
            assert.notEqual(result.logo, expected.logo);
            assert.notEqual(result.description, expected.description);
        };
    });

    it("should not have any elements", (done) => {
        Group.count().execute()
            .then((total) => {
                assert.equal(total, 0);
                done();
            })
            .catch(done);
    });
    it("should create an element", (done) => {
        var group = new Group(groups.noob),
            group2 = new Group(groups.rookie);

        group.save()
            .then((result) => {
                groupCheck(result, groups.noob);

                return group2.save();
            })
            .then((result) => {
                groupCheck(result, groups.rookie);

                done();
            })
            .catch(done);
    });
    it("should not create an invalid element", (done) => {
        var group = new Group(groups.rookieNoScoreNoDesc);

        group.save()
            .then((result) => {
                assert.ok(false);
                done("Path not ok");
            })
            .catch((err)=> {
                assert.ok(true);
                done();
            });
    });
    it("should read all the elements", (done)=> {
        Group.run()
            .then((result)=> {
                for (var i in result)
                    groupCheck(result[i], groups[result[i].name]);

                assert.equal(result.length, 2);
                done();
            })
            .catch(done);
    });
    it("should update the element", (done)=> {
        Group.filter({
                name: "rookie"
            })
            .run()
            .then((result) => {
                assert.equal(result.length, 1);
                groupCheck(result[0], groups.rookie);
                result[0].name = groups.master.name;
                result[0].logo = groups.master.logo;
                result[0].score = groups.master.score;
                result[0].description = groups.master.description;

                return result[0].save();
            })
            .then((result) => {
                groupCheckNot(result, groups.rookie);
                groupCheck(result, groups.master);
                done();
            })
            .catch(done);
    });
    it("should read all the elements", (done)=> {
        Group.run()
            .then((result)=> {
                for (var i in result) {
                    groupCheck(result[i], groups[result[i].name]);
                    groupCheckNot(result[i], groups.rookie);
                }

                assert.equal(result.length, 2);
                done();
            })
            .catch(done);
    });
    it("should delete all elements", (done)=> {
        Group.run()
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
                return Group.run();
            })
            .then((result)=> {
                assert.equal(result.length, 0);
                done();
            })
            .catch(done);
    });
});