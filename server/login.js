var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
	if(username == 'thomas' && password == 'test'){
		return done(null, {username: 'Thomas', type: 'Student'});
	}
	if(username == 'jan' && password == 'test'){
		return done(null, {username: 'Jan', type: 'Supervisor'});
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