const _ = require('lodash');

var Group;

Group = function (definition) {
    var self = {}, hidden = {};

    /* -- Checks -- */
    if (!_.isString(definition.name))
        throw new Error("You must provide a name for the achievements group");
    if (!_.isString(definition.logo))
        throw new Error("You must provide a logo for the achievements group");
    if (!_.isString(definition.description))
        throw new Error("You must provide a description for the achievements group");
    /* -- End Checks -- */

    hidden = _.clone(definition);
    if (!_.isEmpty(hidden.score))
        delete hidden.score;

    hidden.activities = [];
    hidden.model = {};

    self = {
        get modelDefinition() {
            return {
                name: hidden.name,
                logo: hidden.logo,
                description: hidden.description
            }
        },

        get name() {
            return hidden.name;
        },

        get logo() {
            return hidden.logo;
        },

        get description() {
            return hidden.description;
        },

        get activities() {
            return hidden.activities;
        },

        get model() {
            return hidden.model;
        },

        set model(model) {
            hidden.model = model;
        }
    };

    self.push = function (activity) {
        hidden.activities.push(_.cloneDeep(activity));
    };

    self.size = function () {
        return hidden.activities.length;
    };

    self.score = function () {
        var score = 0;
        for (var iActivity in hidden.activities) {
            score += hidden.activities[iActivity].score;
        }
        return score;
    };

    return _.extend(this, self);
};

module.exports = Group;