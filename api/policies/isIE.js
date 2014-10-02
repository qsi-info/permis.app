/**
 * isIE
 *
 * @module      :: Policy
 * @description :: When use Full Integrated Security
 *
 */
module.exports = function(req, res, next) {

	if (sails.settings && sails.settings.auth_strategy == 'full_integrated') {
		var agent = req.headers['user-agent'];
		if (agent && /Windows NT/.test(agent)) {
			return next();
		}
		return res.forbidden('Need Windows IE');
	}

	return next();

};
