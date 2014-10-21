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






application.factory('EquipementFactory', function ($http) {
	var factory = {};

	factory.all = function () {
		return $http.get('/equipement', { cache: true });
	};

	factory.find = function (id) {
		return $http.get('/equipement', { params: { Expr1: id } });
	};

	return factory;

})