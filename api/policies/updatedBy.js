module.exports = function(req, res, next) {
  if(req.query && req.target && req.target.action == 'update') {
  	req.query.updatedBy = req.session.passport.user.account;
  }
  return next();
};