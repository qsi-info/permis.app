
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
    ldap.authenticate(sails.settings.ldap_domain, req.body.username, req.body.password, function (err, user) {
      if (err || !user) { 
        passport.authenticate('local', cb)(req, res);
      } else {
        get_user_ldap_permissions(user, cb);
      }
    })
  }
  else {
    cb(null, false);
  }

}







function get_user_ldap_permissions (user, cb) {
  // Check group permission
  ldap.isMemberOf(user.sAMAccountName, sails.settings.edit_group, function (isMember) {
    if (isMember) {
      user.permission_level = 'edit';
      User.findOrCreateLocalUser(user, cb);
    }
    else {
      ldap.isMemberOf(user.sAMAccountName, sails.settings.contribute_group, function (isMember) {
        if (isMember) {
          user.permission_level = 'contribute';
          User.findOrCreateLocalUser(user, cb);
        }
        else {
          ldap.isMemberOf(user.sAMAccountName, sails.settings.view_group, function (isMember) {
            if (isMember) {
              user.permission_level = 'view';
              User.findOrCreateLocalUser(user, cb);
            }
            else {
              cb(null, false);
            }
          });
        }
      })
    }
  })   
}



