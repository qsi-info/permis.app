var application = angular.module('Application', ['ngRoute']);


application.config(function ($routeProvider) {

	$routeProvider

	// Home route
	.when('/home', {
		templateUrl: '/_api/templates/index',
		controller: 'HomeController'
	})

	// Default route
	.otherwise({ redirectTo: '/home' })

})

