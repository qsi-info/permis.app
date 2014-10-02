module.exports = function (req, res, next) {
	var agent = req.headers['user-agent'];
	if (agent) {
		if (agent.indexOf('Safari') > -1 
		 && agent.indexOf('Chrome') == -1 
		 && agent.indexOf('OPR') == -1) {
			res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
			res.header('Pragma', 'no-cache');
			res.header('Expires', 0);
		}
	}
	next();
}