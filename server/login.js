var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
	if(username == 'tom' && password == 'test'){
		return done(null, {username: 'Tom', type: 'Student'});
	}
	if(username == 'sunny' && password == 'test'){
		return done(null, {username: 'Sunny', type: 'Supervisor'});
	}
	return done(null,false);
}));

passport.serializeUser(function(data, done) {
	done(null, {username: data.username, type: data.type});
});

passport.deserializeUser(function(data, done) {
	done(null, {username: data.username, type: data.type});
});

module.exports = passport;