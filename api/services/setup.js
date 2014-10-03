module.exports = function (settings) {
	sails.settings = settings;
	ldap.configure(settings);
	sails.config.appName = settings.app_name;
}