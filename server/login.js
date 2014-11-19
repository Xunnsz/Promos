var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
	if(username == 'admin' && password == 'test'){
		return done(null, {username: 'admin'});
	}
	return done(null,false);
}));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;