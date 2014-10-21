module.exports = function(req, res, next) {
  if (req.query || req.body) {
  	if (req.target && req.target.action == 'update') {
	  	req.query.updatedBy = req.user.account;
	  	req.body.updatedBy = req.user.account
  	}
	}
  return next();
};