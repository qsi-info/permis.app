/**
 * Global adapter config
 * 
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.adapters = {

  'default': 'guide_gestperm',


  // Eventually from configuration file.
  guide_gestperm: {
    module: 'sails-mssql',
    user: 'SP_RO',
    password: 'password',
    database: 'GestPerm_Dev',
    host: 'guidesrv01',
    port: 1433,
    schema: true,
    migrate: 'safe',
  },

  guide_ti: {
    module: 'sails-mssql',
    user: 'SP_RO',
    password: 'password',
    database: 'GuideTI',
    host: 'guidesrv01',
    port: 1433,
    schema: true,
    migrate: 'safe',
  },

  sp_fiches: {
    module: 'sails-mssql',
    user: 'SP_RO',
    password: 'password',
    database: 'WSS_Content_ddbf1ff03a654576b875c43877771de2',
    host: 'parachemsrv07',
    port: 1433,
    schema: true,
    migrate: 'safe',    
  }


};