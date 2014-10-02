
var passport = require('passport');


module.exports = function (req, res, cb) {

  if (!sails.settings || sails.settings.auth_strategy == 'local_db') {
    passport.authenticate('local', cb)(req, res);
  }

  // else if (sails.settings.auth_strategy == 'full_integrated') {
  //   ldap.findUser(req.body.domain, req.body.username, function (err, user) {
  //     if (err || !user) cb(err, false);
  //     else User.findOrCreateLocalUser(user, cb);
  //   });
  // }

  else if (sails.settings.auth_strategy == 'mix' || sails.settings.auth_strategy == 'full_integrated') {
    ldap.authenticate(req.body.domain, req.body.username, req.body.password, function (err, user) {
      if (err || !user) passport.authenticate('local', cb)(req, res);
      else User.findOrCreateLocalUser(user, cb);
    })     
  }

  else {
    cb(null, false);
  }

}
