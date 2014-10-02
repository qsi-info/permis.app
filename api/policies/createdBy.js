module.exports = function(req, res, next) {
  if(req.query && req.target && req.target.action == 'create') {
  	req.query.createdBy = req.session.user.account;
  }
  return next();
};