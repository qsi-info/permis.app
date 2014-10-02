/**
 * isConfigure
 *
 * @module      :: Policy
 * @description :: Check if the application is already setup
 *
 */
module.exports = function(req, res, next) {

	// Check if the application settings are present.
	if (!sails.settings) return next();

	// Otherwise redirect to the setup page
	return res.redirect('/');

};
