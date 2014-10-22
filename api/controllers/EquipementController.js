/**
 * EquipementController
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

var Q = require('q');


module.exports = {
    
  
	available: function (req, res) {
		Equipement.find()
		.then(function (equipements) {
			EquipementFiche.find()
			.then(function (fiches) {

				var availables_equipements = [];

				for(var i=0, len=equipements.length; i < len; i++) {
					var currentEquipement = equipements[i];
					var j=0, jlen=fiches.length, isFound=false;
					do {
						var currentFiche = fiches[j];
						if (currentFiche.Equipement_Code == currentEquipement.FUN_CODE) {
							isFound = true;
						}
						j++;
					} while(!isFound && j < jlen);
					if (!isFound) {
						availables_equipements.push(currentEquipement);
					}
				}

				return res.json(availables_equipements);

			})
		})
	},	



	// link: function (req, res) {
	// 	Equipement.find()
	// 	.then(function (equipements) {
	// 		EquipementFiche.find()
	// 	})
	// },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to EquipementController)
   */
  _config: {}

  
};









