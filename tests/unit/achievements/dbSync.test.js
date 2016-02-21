const assert = require('assert');
const _ = require('lodash');
const groups = require('../../mockup/groups');
const activities = require('../../mockup/activities');
const Achievements = require('../../../express/achievements');
const app = require('../../mockup/app');
const promiseFor = require('../../../express/utils/promiseFor');
const Group = Achievements.Group;
const Activity = Achievements.Activity;
const DBSync = Achievements.DBSync;

/**
 * TODO: Test unhappy path
 */
describe("Achievements DBSync definition", () => {
    after((done) => {
        app.model.Activity.run()
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
                return app.model.Group.run()
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
                return app.model.Group.run();
            })
            .then((result)=> {
                assert.equal(result.length, 0);
                return app.model.Activity.run();
            })
            .then((result)=> {
                assert.equal(result.length, 0);
                done();
            })
            .catch(done);
    });

    it("define a new group and add achievements", (done) => {
        var group = new Group(groups.noob);

        assert.equal(group.name, groups.noob.name);
        assert.equal(group.description, groups.noob.description);
        assert.equal(group.logo, groups.noob.logo);
        assert.equal(group.score(), 0);
        assert.equal(group.size(), 0);

        var activity = new Activity(activities.secondActNoScore);
        group.push(activity);

        assert.equal(activity.name, activities.secondActNoScore.name);
        assert.equal(activity.description, activities.secondActNoScore.description);
        assert.equal(activity.badge, activities.secondActNoScore.badge);
        assert.equal(activity.score, 0);

        assert.equal(group.score(), 0);
        assert.equal(group.size(), 1);

        activity = new Activity(activities.newSecondAct);
        group.push(activity);

        assert.equal(activity.name, activities.newSecondAct.name);
        assert.equal(activity.description, activities.newSecondAct.description);
        assert.equal(activity.badge, activities.newSecondAct.badge);
        assert.notEqual(activity.score, 0);
        assert.equal(activity.score, activities.newSecondAct.score);

        assert.equal(group.score(), activities.newSecondAct.score);
        assert.equal(group.size(), 2);

        done();
    });

    it("define a new group and add achievements", (done) => {
        var group = new Group(groups.noob);

        assert.equal(group.name, groups.noob.name);
        assert.equal(group.description, groups.noob.description);
        assert.equal(group.logo, groups.noob.logo);
        assert.equal(group.score(), 0);
        assert.equal(group.size(), 0);

        var activity = new Activity(activities.secondActNoScore);
        group.push(activity);

        assert.equal(activity.name, activities.secondActNoScore.name);
        assert.equal(activity.description, activities.secondActNoScore.description);
        assert.equal(activity.badge, activities.secondActNoScore.badge);
        assert.equal(activity.score, 0);

        assert.equal(group.score(), 0);
        assert.equal(group.size(), 1);

        activity = new Activity(activities.newSecondAct);
        group.push(activity);

        assert.equal(activity.name, activities.newSecondAct.name);
        assert.equal(activity.description, activities.newSecondAct.description);
        assert.equal(activity.badge, activities.newSecondAct.badge);
        assert.notEqual(activity.score, 0);
        assert.equal(activity.score, activities.newSecondAct.score);

        assert.equal(group.score(), activities.newSecondAct.score);
        assert.equal(group.size(), 2);

        var activitySync = new DBSync(app, group);
        activitySync.run()
            .then((result)=> {
                assert.equal(result.created, true);
                assert.equal(result.found, false);
                assert.equal(result.activities.created, 2);
                assert.equal(result.activities.found, 0);

                return activitySync.run()
            })
            .then((result)=> {
                assert.equal(result.created, false);
                assert.equal(result.found, true);
                assert.equal(result.activities.created, 0);
                assert.equal(result.activities.found, 2);
                done();
            })
            .catch(done);


    });
});