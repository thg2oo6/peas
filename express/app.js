const config = require('./config');

const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const thinky = require('thinky')(config.thinky);
const RDBStore = require('express-session-rethinkdb')(session);

function registerModules(app, socket, broadcast) {
    require('./modules/dashboard')(app, socket, broadcast);
    require('./modules/activities')(app, socket, broadcast);
    require('./modules/badges')(app, socket, broadcast);
    require('./modules/levels')(app, socket, broadcast);
    require('./modules/profile')(app, socket, broadcast);
    require('./modules/recents')(app, socket, broadcast);
    require('./modules/users')(app, socket, broadcast);
}

function configure(app) {
    app.config = config;
    app.thinky = thinky;
    app.model = require('./models')(thinky);

    var io = require('socket.io').listen(3001);

    app.use(cors({
        credentials: true,
        origin: config.host
    }));

    var sessionStore = new RDBStore({
        connectOptions: {
            servers: [
                {host: config.thinky.host, port: config.thinky.port}
            ],
            db: config.thinky.db,
            discovery: false,
            pool: true,
            buffer: 50,
            max: 1000,
            timeout: 20,
            timeoutError: 1000
        },
        table: 'session',
        sessionTimeout: 86400000,
        flushInterval: 60000
    });

    var sessionMiddleWare = session({
        cookieParser: cookieParser,
        key: 'connect.sid',
        secret: config.session.secret,
        store: sessionStore,
        resave: false,
        saveUninitialized: true
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    app.use(cookieParser());
    app.use(sessionMiddleWare);

    // setup passport
    require('./passport')(app, sessionStore, io);
    require('../modules')(app);

    io.sockets.on('connection', function (socket) {
        registerModules(app, socket, io.sockets);
    });
}

module.exports = configure;
