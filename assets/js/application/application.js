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

	.when('/unlink', {
		templateUrl: '/_api/templates?template=equipement.unlink.ejs',
		controller: 'UnlinkController',
	})

	.when('/unlink/confirmation/:link_id', {
		templateUrl: '/_api/templates?template=unlink.confirmation.ejs',
		controller: 'UnlinkConfirmationController'
	})

	// Default route
	.otherwise({ redirectTo: '/home' });





})

