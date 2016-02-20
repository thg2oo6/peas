const config = require('./config');

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const thinky = require('thinky')(config.thinky);

function registerModules(app, socket) {
    require('./modules/dashboard')(app, socket);
}

function configure(app) {
    var io = require('socket.io').listen(3001);

    io.sockets.on('connection', function (socket) {
        registerModules(app, socket);
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cookieParser());
    app.use(session({
        secret: config.session.secret,
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = configure;