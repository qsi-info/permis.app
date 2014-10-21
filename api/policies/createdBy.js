module.exports = function(req, res, next) {
	if (req.body || req.query) {
	  if(req.target && req.target.action == 'create') {
	  	req.query.createdBy = req.user.account;
	  	req.query.updatedBy = req.user.account;
	  	req.body.createdBy = req.user.account;
	  	req.body.updatedBy = req.user.account;
	  }
	}
  return next();
};