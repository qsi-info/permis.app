/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {


	// Check if user admin is present, if not create one
	User.findOne()
	.where({ account: 'admin' })
	.then(function (admin) {
		if (admin) {
			Settings.find()
			.then(function (settings) {
				if (settings.length < 1) return cb();	
				setup(settings[0]);
				// sails.settings = settings;
				// sails.config.appName = settings.app_name;
				// ldap.configure(settings);
				return cb();				
			})
		} else {
			// Eventually get those informations from a config file.
			User.create({
				account: 'admin',
				password: 'admin',
				mail: 'admin@qsi.ca',
				displayName: 'ADMIN',
				permission_level: 'admin',
				provider: 'local',
			})
			.then(function (user) {
				return cb();
			})
			.fail(function (err) {
				console.log(err);
			})
		}
	})
	.fail(function (err) {
		console.log(err);
	})




  // cb();
};