const _ = require("lodash");
const express = require("express");
const path = require('path');

const Achievements = require('../../express/achievements');
const DBSync = Achievements.DBSync;

const achievements = require('./achievements');
const routes = require('./routes');

var Sample;

Sample = function (app) {
    var sync = new DBSync(app, achievements.group);

    sync.run();
    new routes(app, 'sample', achievements);
    app.use('/images/achievements/sample/', express.static(path.join(__dirname, 'images/')));
};

module.exports = Sample;