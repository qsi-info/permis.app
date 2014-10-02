/**
 * 
 * Basic authentication strategy is defined here.
 * Other strategies can be defined as needed by adding files like this to the services folder.
 * 
 */

var passport      = require('passport')
// var BasicStrategy = require('passport-http').BasicStrategy;
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt');




passport.use(new LocalStrategy(function (username, password, done) {
	User.findOne()
	.where({ account: username })
	.then(function (user) {
		if (!user) return done(null, user);
		bcrypt.compare(password, user.password, function (err, isIdentical) {
			if (err || !isIdentical) return done(err, false);
			if (isIdentical) return done(null, user);
		});
	});
}));



// /**
//  * - Basic Strategy
//  * This strategy is call is the Basic HTTP Auth scheme.
//  * It authentificate the user against the LDAP Server.
//  */
// passport.use(new BasicStrategy(function(username, password, done) {
// 	console.log('Enter Basix');
// 	ldap.authenticate(sails.settings.ldap_domain, username, password, function (err, user) {
// 		if (err || !user) return done(err, false);
// 		User.findOrCreateLocalUser(user, done);
// 	}) 
// }));


/**
 * - Passport serializeUser
 */
passport.serializeUser(function (user, done) {
  done(null, user);
});


/**
 * - Passport deserializeUser
 */
passport.deserializeUser(function (user, done) {
	if (user.isAdmin) return done(null, user);
  User.findOne(user.id, function (err, user) {
    done(err, user);
  });
});



// Express middleware for the passport.
module.exports = {
 express: {
    customMiddleware: function(app){
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};