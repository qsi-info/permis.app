application.controller('HomeController', function ($scope, $http, ItemFactory) {

	init();

	function init() {
		ItemFactory.all().success(function (items) {
			console.log(items);
		})
	}

})





application.controller('EquipementListController', function ($scope, EquipementFactory) {

	init();

	function init () {
		$('body').addClass('loading');
		EquipementFactory.all()
		.success(function (equipements) {
			$scope.equipements = equipements;
			$('body').removeClass('loading');
			$('#equipementSearchInput').focus();
		})
	}
 
});






application.controller('EquipementShowController', function ($scope, $routeParams, EquipementFactory) {

	init()

	function init () {
		EquipementFactory.find($routeParams.equipement_id).success(function (equipement) {
			$scope.equipement = equipement[0];
		})
	}

})