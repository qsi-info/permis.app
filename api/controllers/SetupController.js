/**
 * SetupController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  index: function (req, res) {
  	return res.view({ layout: 'setup.layout' });
  },

  configure: function (req, res) {
  	Settings.create(req.body)
  	.then(function (settings) {
  		sails.settings = settings;
  		ldap.configure(settings);
  		return res.redirect('/admin');
  	})
  	.fail(function (err) {
  		return console.log(err);
  	})
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SetupController)
   */
  _config: {}

  
};
