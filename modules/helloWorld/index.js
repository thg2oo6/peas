const Achievements = require('../../express/achievements');
const DBSync = Achievements.DBSync;

const achievements = require('./achievements');

var HelloWorld;

HelloWorld = function (app) {
    var sync = new DBSync(app, achievements);

    sync.run();
};

module.exports = HelloWorld;