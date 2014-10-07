module.exports = function(req, res, next) {
  if(req.query && req.target && req.target.action == 'create') {
  	req.query.createdBy = req.session.passport.user.account;
  	req.query.updatedBy = req.session.passport.user.account;
  }
  return next();
};