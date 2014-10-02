module.exports = function (req, res, next) {
	if (!req.isSocket) {
		var locale = req.cookies[sails.config.i18n.cookie];
		if (!locale) {
			locale = sails.config.i18n.defaultLocale;
			res.cookie(sails.config.i18n.cookie, locale);
		}
		res.setLocale(locale);
	}
	next();
}