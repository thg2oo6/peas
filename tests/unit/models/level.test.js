const assert = require('assert');
const _ = require('lodash');
const app = require('../../mockup/app');
const levels = require('../../mockup/levels');
const Level = app.model.Level;
const promiseFor = require('../../utils/promiseFor');

var levelCheck, levelCheckNot;

/**
 * TODO: Test unhappy path
 */
describe("Level Model", () => {
    before(() => {
        levelCheck = (result, expected) => {
            assert.equal(result.name, expected.name);
            assert.equal(result.minScore, expected.minScore);
            assert.equal(result.logo, expected.logo);
        };
        levelCheckNot = (result, expected) => {
            assert.notEqual(result.name, expected.name);
            assert.notEqual(result.minScore, expected.minScore);
            assert.notEqual(result.logo, expected.logo);
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
        var level = new Level(levels.noob),
            level2 = new Level(levels.rookie);

        level.save()
            .then((result) => {
                levelCheck(result, levels.noob);

                return level2.save();
            })
            .then((result) => {
                levelCheck(result, levels.rookie);

                done();
            })
            .catch(done);
    });
    it("should read all the elements", (done)=> {
        Level.run()
            .then((result)=> {
                for (var i in result)
                    levelCheck(result[i], levels[result[i].name]);

                assert.equal(result.length, 2);
                done();
            })
            .catch(done);
    });
    it("should update the element", (done)=> {
        Level.filter({
                name: "rookie"
            })
            .run()
            .then((result) => {
                assert.equal(result.length, 1);
                levelCheck(result[0], levels.rookie);
                result[0].name = levels.master.name;
                result[0].logo = levels.master.logo;
                result[0].minScore = levels.master.minScore;

                return result[0].save();
            })
            .then((result) => {
                levelCheckNot(result, levels.rookie);
                levelCheck(result, levels.master);
                done();
            })
            .catch(done);
    });
    it("should read all the elements", (done)=> {
        Level.run()
            .then((result)=> {
                for (var i in result) {
                    levelCheck(result[i], levels[result[i].name]);
                    levelCheckNot(result[i], levels.rookie);
                }

                assert.equal(result.length, 2);
                done();
            })
            .catch(done);
    });
    it("should delete all elements", (done)=> {
        Level.run()
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
                return Level.run();
            })
            .then((result)=> {
                assert.equal(result.length, 0);
                done();
            })
            .catch(done);
    });
});