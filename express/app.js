const config = require('./config');

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const thinky = require('thinky')(config.thinky);

function registerModules(app, socket, broadcast) {
    require('./modules/dashboard')(app, socket, broadcast);
    require('./modules/activities')(app, socket, broadcast);
    require('./modules/badges')(app, socket, broadcast);
    require('./modules/levels')(app, socket, broadcast);
    require('./modules/recents')(app, socket,broadcast);
    require('./modules/users')(app, socket, broadcast);
}

function configure(app) {
    app.config = config;
    app.thinky = thinky;
    app.model = require('./models')(thinky);

    var io = require('socket.io').listen(3001);

    var sessionMiddleWare = session({
        secret: config.session.secret,
        resave: false,
        saveUninitialized: true
    });

    io.sockets.on('connection', function (socket) {
        registerModules(app, socket, io.sockets);
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cookieParser());
    app.use(session);

    // setup passport
    require('./passport')(app);
    require('../modules')(app);
}

module.exports = configure;
