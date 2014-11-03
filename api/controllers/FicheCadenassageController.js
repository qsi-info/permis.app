/**
 * FicheCadenassageController
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
    
	production: function (req, res) {
		FicheCadenassage.query("SELECT DirName, LeafName, Id from " + FicheCadenassage._tableName + " WHERE (DirName LIKE 'gesdoc/Production/8.0 Fiches%') AND (LeafName LIKE '%.doc%' OR LeafName LIKE '%.xls%') ", function (err, fiches) {
			if (err) return console.log(err);
			return res.json(fiches); 
		})
	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to FicheCadenassageController)
   */
  _config: {}

  
};
