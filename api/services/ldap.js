var ActiveDirectory = require('activedirectory');
var Q = require('q');

module.exports = (function () {

	var ad;

	return {

		authenticate: function (domain, username, password, cb) {
			console.log(domain, username, password);
			console.log(sails.settings.ldap_domain);
			ad.getRootDSE(function (err, results) {
				if (err) return (err, false);
				if (!password) {
					console.log('Using no password');
					if (domain != sails.settings.ldap_domain) return cb(null, false);
					ad.findUser(username, function (err, user) {
						if (err || !user) return cb(err, false);
						return cb(null, user);
					});
				}
				else {
					var account = domain + '\\' + username;
					ad.authenticate(account, password, function (err, isAuthenticated) {
						if (err || !isAuthenticated) return cb(err, false);
						ad.findUser(username, function (err, user) {
							if (err || !user) return cb(err, false);
							return cb(null, user);
						})
					})					
				}
			});
		},

		findUser: function (domain, username, cb) {
			if (domain != sails.settings.domain) return cb(null, false);
			ad.findUser(username, function (err, user) {
				if (err || !user) return cb(err, false);
				return cb(null, user);
			})
		},

		configure: function (settings) {
			if (settings.ldap_url) {
				ad = new ActiveDirectory({
					url: settings.ldap_url,
					baseDN: settings.ldap_basedn,
					username: settings.ldap_domain + '\\' + settings.ldap_username,
					password: settings.ldap_password,
				});
			}
		},


		isMemberOf: function (account, group, cb){
			ad.isUserMemberOf(account, group, function (err, isMember) {
				if (err) return console.log(err);
				return cb(isMember);
			});
		},

		userExists: function (account, cb) {
			ad.findUser(account, function (err, user) {
				if (err || !user) return cb(false);
				return cb(true);
			})
		}


	}


})();



