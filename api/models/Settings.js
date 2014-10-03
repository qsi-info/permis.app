/**
 * Settings
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	tableName: 'Settings',

  attributes: {
		

  	// Authentification settings
  	auth_strategy: {
  		type: 'string',
  		enum: ['full_integrated', 'local_db', 'mix'],
  		required: true,
  	},

  	auth_login: {
  		type: 'string',
  		enum: ['basic_http', 'sign_in'],
  		required: true,
  	},



		// LDAP configuration settings
		ldap_url: {
			type: 'string',
			defaultsTo: ''
			// defaultsTo: 'ldap://your.domain',
		},

		ldap_domain: {
			type: 'string',
			defaultsTo: ''
			// defaultsTo: 'DOMAIN',
		},

		ldap_basedn: {
			type: 'string',
			defaultsTo: ''
			// defaultsTo: 'DC=domain,DC=com'
		},

		ldap_username: {
			type: 'string',
			defaultsTo: ''
			// defaultsTo: 'username@domain.com',
		},

		ldap_password: {
			type: 'string',
			defaultsTo: ''
			// defaultsTo: 'password',
		},
    
  }

};
