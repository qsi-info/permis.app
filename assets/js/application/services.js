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

	factory.find = function (code) {
		return $http.get('/equipement', { params: { Expr1: code }});
	};


	factory.availables = function () {
		return $http.get('/equipement/available');
	};


	return factory;

})







application.factory('EquipementFicheFactory', function ($http) {
	var factory = {};

	factory.create = function (fiche) {
		return $http.post('/equipementfiche', fiche);
	};

	factory.find = function (id) {
		return $http.get('/equipementfiche/' + id);
	}

	factory.all = function () {
		return $http.get('/equipementfiche');
	};

	factory.delete = function (id) {
		return $http.delete('/equipementfiche/' + id);
	}

	return factory;

})





application.factory('FicheFactory', function ($http) {
	var factory = {};

	factory.all = function () {
		return $http.get('/fichecadenassage/production', { cache: true });
	};

	factory.find = function (id) {
		return $http.get('/fichecadenassage/' + id);
		// return $http.get('/fichecadenassage/', { params: { Id: id }});
	};

	return factory;

})










