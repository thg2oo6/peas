const Achievements = require('../../express/achievements');
const DBSync = Achievements.DBSync;

const achievements = require('./achievements');
const routes = require('./routes');

var HelloWorld;

HelloWorld = function (app) {
    var sync = new DBSync(app, achievements);

    sync.run();
    new routes(app, 'hello-world');
};

module.exports = HelloWorld;