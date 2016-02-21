const config = require('../../mockup/config');
const app = require('../../mockup/app');
const thinky = require('thinky')(config.thinky);
const promiseFor = require('../../utils/promiseFor');

// Models
app.config = config;
app.thinky = thinky;
app.model = require("../../../express/models")(thinky);

var cleanUp = function () {
    return app.model.Level.run()
        .then((result)=> {
            return promiseFor(function (count) {
                return count < result.length;
            }, function (count) {
                return result[count].deleteAll()
                    .then(function (res) {
                        return ++count;
                    });
            }, 0);
        })
        .then(()=> {
            return app.model.Activity.run()
                .then((result)=> {
                    return promiseFor(function (count) {
                        return count < result.length;
                    }, function (count) {
                        return result[count].deleteAll()
                            .then(function (res) {
                                return ++count;
                            });
                    }, 0);
                });
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
                    }, 0);
                });
        });
};

before((done) => {
    try {
        cleanUp().then(()=> {
            done();
        });
    } catch (e) {
        done(e);
    }
});

after((done) => {
    cleanUp().then(()=> {
        done();
    });
});