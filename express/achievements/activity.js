const _ = require('lodash');

var Activity;

Activity = function (definition) {
    var self = {}, hidden = {};

    /* -- Checks -- */
    if (!_.isString(definition.name))
        throw new Error("You must provide a name for the group");
    if (!_.isString(definition.badge))
        throw new Error("You must provide a badge for the group");
    if (!_.isString(definition.description))
        throw new Error("You must provide a description for the group");
    if (!_.isInteger(definition.score))
        definition.score = 0;
    /* -- End Checks -- */

    hidden = _.clone(definition);
    hidden.model = {};

    self = {
        get modelDefinition() {
            return {
                name: hidden.name,
                badge: hidden.badge,
                description: hidden.description,
                score: hidden.score
            }
        },

        get name() {
            return hidden.name;
        },

        get badge() {
            return hidden.badge;
        },

        get description() {
            return hidden.description;
        },

        get score() {
            return hidden.score;
        },

        get model() {
            return hidden.model;
        },

        set model(model) {
            hidden.model = model;
        }
    };

    return _.extend(this, self);
};

module.exports = Activity;