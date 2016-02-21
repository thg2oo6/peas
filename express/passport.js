const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportSocketIo = require('passport.socketio');
const bcrypt = require('bcrypt');
const config = require('./config');

function configure(app, sessionStore, io) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // This is how a user gets deserialized
  passport.deserializeUser(function(id, done) {
      var user = app.model.User.get(id).then((user) => {
        return done(null, user);
      });
  });

  // Lookup a user in our database
  var lookupUser = function(username, password, done) {
      var results = app.model.User.filter({ username: username }).then((results) => {
        if (results.length === 0 || bcrypt.compareSync(password, results[0].password) === false) {
          return done(null, false, { error: 'Incorrect username or password.' });
        } else {
          return done(null, results.pop());
        }
      });
  };

  passport.use(new LocalStrategy({ usernameField: 'username', session: true }, lookupUser));

  io.use(passportSocketIo.authorize({
    cookieParser: require('cookie-parser'),
    key: 'connect.sid',
    secret: config.session.secret,
    store: sessionStore
  }));

  app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      res.json(req._passport);
    });

  app.get('/getSession', function(req, res) {
    if (req.cookies['connect.sid']) {
      var sid = req.cookies['connect.sid'].substr(2).split('.');
      res.json({ sid: sid[0] })
    } else {
      res.json({});
    }
  });

  app.post('/register', function(req, res) {
      if (!(req.body && req.body.user && req.body.user.password.length >= 8)) {
        res.status(400).json({
            name: "ValidationError",
            message: "Password length must be longer or equal to 8 characters"
        });
      }

      var user = app.model.User({
        username: req.body.user.username,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        password: bcrypt.hashSync(req.body.user.password, 8),
        email: req.body.user.email
      });

      var validationError = user.validate();

      if (validationError) {
        res.send(validationError);
      }

      user.save().then(function() {
        res.send({});
      });
  });
}

module.exports = configure;
