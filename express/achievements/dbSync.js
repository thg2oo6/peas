const _ = require('lodash');
const promiseFor = require('../utils/promiseFor');

var DBSync;

DBSync = function (app, group) {
    var self = {}, hidden = {};
    const Group = app.model.Group;
    const Activity = app.model.Activity;

    hidden.group = group;
    hidden.created = false;
    hidden.found = false;
    hidden.activities = {
        created: 0,
        found: 0
    };

    hidden.checkGroup = function () {
        return Group.filter(hidden.group.modelDefinition).run();
    };
    hidden.createGroup = function () {
        var group = new Group(hidden.group.modelDefinition);

        hidden.created = true;
        return group.save()
            .then((result) => {
                hidden.group.model = result;
                return hidden.checkActivities();
            });
    };

    hidden.checkActivities = function () {
        var activities = hidden.group.activities;

        return promiseFor(function (count) {
            return count < activities.length;
        }, function (count) {
            return hidden.checkActivity(activities[count])
                .then((result)=> {
                    //    .save()
                    if (result.length != 0) {
                        hidden.activities.found++;
                        activities[count].model = result.pop();
                        return result;
                    }

                    return hidden.createActivity(activities[count]);
                })
                .then((model) => {
                    return ++count;
                });
        }, 0)
    };
    hidden.checkActivity = function (activity) {
        return Activity.filter(activity.modelDefinition).run();
    };
    hidden.createActivity = function (activity) {
        var act = new Activity(activity.modelDefinition);

        return act.save()
            .then((result) => {
                ++hidden.activities.created;
                activity.model = result;
                return result;
            });
    };

    self.run = function () {
        hidden.created = false;
        hidden.found = false;
        hidden.activities = {
            created: 0,
            found: 0
        };

        return hidden.checkGroup()
            .then((result) => {
                hidden.found = result.length != 0;

                if (hidden.found) {
                    hidden.group.model = result.pop();
                    return hidden.checkActivities();
                }

                return hidden.createGroup();
            })
            .then(()=> {
                return hidden.group.model.save();
            })
            .then((data)=> {
                return {
                    created: hidden.created,
                    found: hidden.found,
                    activities: hidden.activities
                };
            });
    };

    self.remove = function () {
        // TODO: Remove function
    };

    self.unload = function () {
        // TODO: Unload function
    };

    return _.extend(this, self);
};

module.exports = DBSync;