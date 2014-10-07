/**
 * Item
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {


	usage: 'app',


  attributes: {
  	
  	title: {
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
  },


  inputs: {
    title: {
      type: 'text',
    }
  }


};
