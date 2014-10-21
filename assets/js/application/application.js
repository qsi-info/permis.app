var application = angular.module('Application', ['ngRoute']);


application.config(function ($routeProvider) {

	$routeProvider

	// Home route
	.when('/home', {
		templateUrl: '/_api/templates?template=home.ejs',
		controller: 'HomeController'
	})

	.when('/equipement', {
		templateUrl: '/_api/templates?template=equipement.list.ejs',
		controller: 'EquipementListController',
	})

	.when('/equipement/:equipement_id', {
		templateUrl: '/_api/templates?template=equipement.show.ejs',
		controller: 'EquipementShowController',
	})

	// Default route
	.otherwise({ redirectTo: '/equipement' })

})

