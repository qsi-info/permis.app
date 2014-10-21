/**
 * EquipementFiche
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  tableName: 'Equipements_Fiches',
  migrate: 'safe',

  attributes: {

  	Equipement_Code: {
  		type: 'string',
  		defaultsTo: '',
  	},

  	Equipement_Description: {
  		type: 'string',
  		defaultsTo: '',
  	},

  	Niveau_Description: {
  		type: 'string',
  		defaultsTo: '',
  	},

  	Nom_Fichier: {
  		type: 'string',
  		defaultsTo: '',
  	},

  	createdBy: {
  		type: 'string',
  		required: true,
  	},
    
  	updatedBy: {
  		type: 'string',
  		required: true,
  	},    



  }

};
