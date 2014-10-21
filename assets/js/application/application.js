var application = angular.module('Application', ['ngRoute', 'ngAnimate']);


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

	.when('/equipement/:equipement_code', {
		templateUrl: '/_api/templates?template=equipement.show.ejs',
		controller: 'EquipementShowController',
	})

	.when('/confirmation/:equipement_code/:fiche_id', {
		templateUrl: '/_api/templates?template=confirmation.ejs',
		controller: 'ConfirmationController',
	})

	// Default route
	.otherwise({ redirectTo: '/home' });





})

