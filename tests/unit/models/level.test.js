var assert = require('assert'),
    _ = require('lodash'),
    app = require('../../mockup/app'),
    Level = app.model.Level;

var levels, levelCheck;

describe("Level Model", () => {
    before(() => {
        levels = {
            noob: {
                name: "N00b",
                minScore: 0,
                logo: "/images/levels/noob.png"
            }
        };

        levelCheck = (result, expected) => {
            assert.equal(result.name, expected.name);
            assert.equal(result.minScore, expected.minScore);
            assert.equal(result.logo, expected.logo);
        };
    });

    it("should not have any elements", (done) => {
        Level.count().execute()
            .then((total) => {
                assert.equal(total, 0);
                done();
            })
            .catch(done);
    });
    it("should create an element", (done) => {
        var level = new Level(levels.noob);

        level.save()
            .then((result) => {
                levelCheck(result, levels.noob);

                done();
            })
            .catch(done);
    });
    it("should update the element");
    it("should delete the element");
});