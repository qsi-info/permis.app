module.exports = function(req, res, next) {
  
  if (req.query && req.target && req.target.action) {

  	var permission = req.user.permission_level;
  	var action = req.target.action;

  	switch (permission) {
  		case 'admin': 
  		case 'edit' : return next();
  		case 'contribute': 
  			if (action !== 'destroy') return next();
  		case 'view': 
  			if (action == 'find') return next();
  		default: return res.forbidden('You cannot ' + action + ' with your permission level: ' + permission);
  	}
  } else {
	  return next();
  }


};