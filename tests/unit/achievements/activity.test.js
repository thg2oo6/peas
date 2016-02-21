const assert = require('assert');
const _ = require('lodash');
const activities = require('../../mockup/activities');
const Activity = require('../../../express/achievements/activity');

/**
 * TODO: Test unhappy path
 */
describe("Achievements Activity definition", () => {

    it("define a new activity", (done) => {
        var activity = new Activity(activities.firstAct);

        assert.equal(activity.name, activities.firstAct.name);
        assert.equal(activity.description, activities.firstAct.description);
        assert.equal(activity.badge, activities.firstAct.badge);
        assert.equal(activity.score, 0);
        done();
    });
    it("define a new activity without score", (done) => {
        var activity = new Activity(activities.secondActNoScore);

        assert.equal(activity.name, activities.secondActNoScore.name);
        assert.equal(activity.description, activities.secondActNoScore.description);
        assert.equal(activity.badge, activities.secondActNoScore.badge);
        assert.equal(activity.score, 0);
        done();
    });
    it("define a new activity with score > 0", (done) => {
        var activity = new Activity(activities.newSecondAct);

        assert.equal(activity.name, activities.newSecondAct.name);
        assert.equal(activity.description, activities.newSecondAct.description);
        assert.equal(activity.badge, activities.newSecondAct.badge);
        assert.notEqual(activity.score, 0);
        assert.equal(activity.score, activities.newSecondAct.score);
        done();
    });
});