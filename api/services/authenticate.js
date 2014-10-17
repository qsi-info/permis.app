
var passport = require('passport');
var Q = require('q');


module.exports = function (req, res, cb) {

  if (req.body.username == '' || req.body.password == '') {
    cb(null, false);
  }

  else if (!sails.settings || sails.settings.auth_strategy == 'local_db') {
    passport.authenticate('local', cb)(req, res);
  }

  // else if (sails.settings.auth_strategy == 'full_integrated') {
  //   console.log('User full_integrated');
  //   console.log(req.body);
  //   console.log(sails.settings);
  //   var domain = typeof req.body.domain !== 'undefined' ? req.body.domain : sails.settings.ldap_domain;

  //   ldap.authenticate(domain, req.body.username, undefined, function (err, user) {
  //     if (err || !user) passport.authenticate('local', cb)(req, res);
  //     else get_user_ldap_permissions(user, cb);
  //   })
  // }

  else if (sails.settings.auth_strategy == 'mix' || sails.settings.auth_strategy == 'full_integrated') {
    var domain = typeof req.body.domain !== 'undefined' ? req.body.domain : sails.settings.ldap_domain;
    var password = req.body.password;
    ldap.authenticate(domain, req.body.username, password, function (err, user) {
      if (err || !user) passport.authenticate('local', cb)(req, res);
      else get_user_ldap_permissions(user, cb);
    })
  }
  else {
    cb(null, false);
  }

}







function get_user_ldap_permissions (user, cb) {
  // Check group permission

  var promises = [];


  var deferredEdit = Q.defer();
  ldap.isMemberOf(user.sAMAccountName, sails.settings.edit_group, function (isMember) {
    deferredEdit.resolve(isMember);
  });
  promises.push(deferredEdit.promise)

  var deferredContribute = Q.defer();
  ldap.isMemberOf(user.sAMAccountName, sails.settings.contribute_group, function (isMember) {
    deferredContribute.resolve(isMember);
  });
  promises.push(deferredContribute.promise)

  var deferredView = Q.defer();
  ldap.isMemberOf(user.sAMAccountName, sails.settings.view_group, function (isMember) {
    deferredView.resolve(isMember);
  });
  promises.push(deferredView.promise)

  Q.all(promises).then(function (memberships) {
    if (memberships[0] || sails.settings.everyone_permission_level == 'edit') {
      user.permission_level = 'edit';
      User.findOrCreateLocalUser(user, cb);
    } 
    else if (memberships[1] || sails.settings.everyone_permission_level == 'contribute') {
      user.permission_level = 'contribute';
      User.findOrCreateLocalUser(user, cb);
    } 
    else if (memberships[2] || sails.settings.everyone_permission_level == 'view') {
      user.permission_level = 'view';
      User.findOrCreateLocalUser(user, cb);
    }
    else cb(null, false);
  })
  .fail(function (err) {
    console.log(err);
  })
}



