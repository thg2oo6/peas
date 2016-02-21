const assert = require('assert');
const _ = require('lodash');
const groups = require('../../mockup/groups');
const Group = require('../../../express/achievements/group');

/**
 * TODO: Test unhappy path
 */
describe("Achievements Group definition", () => {
    it("define a new group", (done) => {
        var group = new Group(groups.noob);

        assert.equal(group.name, groups.noob.name);
        assert.equal(group.description, groups.noob.description);
        assert.equal(group.logo, groups.noob.logo);
        assert.equal(group.score(), 0);
        assert.equal(group.size(), 0);
        done();
    });

    it("define a new group and add achievements", (done) => {
        var group = new Group(groups.noob);

        assert.equal(group.name, groups.noob.name);
        assert.equal(group.description, groups.noob.description);
        assert.equal(group.logo, groups.noob.logo);
        assert.equal(group.score(), 0);

        group.push({name: "1", score: 1});
        group.push({name: "2", score: 2});
        group.push({name: "3", score: 3});
        group.push({name: "4", score: 4});

        assert.equal(group.score(), 10);
        assert.equal(group.size(), 4);
        done();
    });
});