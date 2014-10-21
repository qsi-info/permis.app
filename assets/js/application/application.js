var application = angular.module('Application', ['ngRoute']);


application.config(function ($routeProvider) {

	$routeProvider

	// Home route
	.when('/home', {
		templateUrl: '/_api/templates?template=home.ejs',
		controller: 'HomeController'
	})

	// Default route
	.otherwise({ redirectTo: '/home' })

})

