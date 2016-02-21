const assert = require('assert');
const _ = require('lodash');
const app = require('../../mockup/app');
const groups = require('../../mockup/groups');
const activities = require('../../mockup/activities');
const Activity = app.model.Activity;
const Group = app.model.Group;
const promiseFor = require('../../../express/utils/promiseFor');

var activityCheck, activityCheckNot;

/**
 * TODO: Test unhappy path
 */
describe("Activity Model", () => {
    before(() => {
        activityCheck = (result, expected) => {
            assert.equal(result.name, expected.name);
            assert.equal(result.score, expected.score);
            assert.equal(result.badge, expected.badge);
            assert.equal(result.description, expected.description);
        };
        activityCheckNot = (result, expected) => {
            assert.notEqual(result.name, expected.name);
            assert.notEqual(result.score, expected.score);
            assert.notEqual(result.badge, expected.badge);
            assert.notEqual(result.description, expected.description);
        };
    });

    it("should not have any elements", (done) => {
        Group.count().execute()
            .then((total) => {
                assert.equal(total, 0);
                return Activity.count().execute()
            })
            .then((total) => {
                assert.equal(total, 0);

                return (new Group(groups.noob)).save();
            })
            .then((result)=> {
                groups.noob.id = result.id;
                done();
            })
            .catch(done);
    });
    it("should create an element", (done) => {
        var activity = new Activity(activities.firstAct),
            activity2 = new Activity(activities.secondAct);

        activity.group = groups.noob;
        activity2.group = groups.noob;

        activity.save()
            .then((result) => {
                activityCheck(result, activities.firstAct);
                assert.equal(result.group.id, groups.noob.id);

                return activity2.save();
            })
            .then((result) => {
                activityCheck(result, activities.secondAct);
                assert.equal(result.group.id, groups.noob.id);

                done();
            })
            .catch(done);
    });
    it("should not create an invalid element", (done) => {
        var activity = new Activity(activities.secondActNoScoreNoDesc);

        activity.save()
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
        Activity.run()
            .then((result)=> {
                for (var i in result)
                    activityCheck(result[i], activities[result[i].name]);

                assert.equal(result.length, 2);
                done();
            })
            .catch(done);
    });
    it("should update the element", (done)=> {
        Activity.filter({
                name: "secondAct"
            })
            .run()
            .then((result) => {
                assert.equal(result.length, 1);
                activityCheck(result[0], activities.secondAct);
                result[0].merge(activities.newSecondAct);

                return result[0].save();
            })
            .then((result) => {
                activityCheckNot(result, activities.secondAct);
                activityCheck(result, activities.newSecondAct);
                done();
            })
            .catch(done);
    });
    it("should read all the elements", (done)=> {
        Activity.run()
            .then((result)=> {
                for (var i in result) {
                    activityCheck(result[i], activities[result[i].name]);
                    activityCheckNot(result[i], activities.secondAct);
                }

                assert.equal(result.length, 2);
                done();
            })
            .catch(done);
    });

    it("should delete all elements", (done)=> {
        Activity.run()
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