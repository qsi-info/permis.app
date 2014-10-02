/**
 * isConfigure
 *
 * @module      :: Policy
 * @description :: Check if the application is configure
 *
 */
module.exports = function(req, res, next) {

	// Check if the application settings are present.
	if (sails.settings) return next();

	// Otherwise redirect to the setup page
	return res.redirect('/setup');

};
