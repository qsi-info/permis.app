/**
 *  Application.Services
 *  - this is where all the factories and services are configure.
 * 
 * 
 */ 


 application.factory('ItemFactory', function ($http) {
 		var factory = {};

 		factory.all = function () {
 			return $http.get('/item');
 			
 		};

 		return factory;
 })