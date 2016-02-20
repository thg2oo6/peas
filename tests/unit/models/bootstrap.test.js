const config = require('../../mockup/config');
const app = require('../../mockup/app');
const thinky = require('thinky')(config.thinky);
const Promise = require("bluebird");

const Level = require("../../../express/models/level")(thinky);

app.config = config;
app.thinky = thinky;
app.model = {
    Level: Level
};

var promiseFor = Promise.method(function (condition, action, value) {
    if (!condition(value)) return value;
    return action(value).then(promiseFor.bind(null, condition, action));
});

var cleanUp = function () {
    return Level.run().then((result)=> {
        return promiseFor(function (count) {
            return count < result.length;
        }, function (count) {
            return result[count].deleteAll()
                .then(function (res) {
                    return ++count;
                });
        }, 0);
    });
};

before((done) => {
    cleanUp().then(()=> {
        done();
    });
});

after((done) => {
    cleanUp().then(()=> {
        done();
    });
});