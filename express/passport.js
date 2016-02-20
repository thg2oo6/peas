const passport = require('passport');
const LocalStrategy = require('passport-local');

function configure(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // This is how a user gets deserialized
  passport.deserializeUser(function(id, done) {
      var user = app.model.User.get(id);
      return done(null, user);
  });

  // Lookup a user in our database
  var lookupUser = function(username, password, done) {
      var results = app.model.User.filter({ username: username, password: password }).run();

      if (results.length === 0) {
        return done(null, false, { error: 'Incorrect username or password.' });
      } else {
        return done(null, results.pop());
      }
  };

  passport.use(new LocalStrategy({ usernameField: 'username', session: true }, lookupUser));

  app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      res.json({ id: req.user.id, username: req.user.username });
    });
}

module.exports = configure;
