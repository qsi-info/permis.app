application.controller('HomeController', function ($scope, $http, ItemFactory) {

	init();

	function init() {
	}

})





application.controller('EquipementListController', function ($scope, EquipementFactory) {

	init();

	function init () {
		$('body').addClass('loading');
		EquipementFactory.availables()
		.success(function (equipements) {
			$scope.equipements = equipements;
			$('body').removeClass('loading');
			$('#equipementSearchInput').focus();
		})
	}
 
});






application.controller('EquipementShowController', function ($scope, $routeParams, $location, EquipementFactory, FicheFactory) {

	init()

	function init () {
		$('body').addClass('loading');
		EquipementFactory.find($routeParams.equipement_code).success(function (equipement) {
			if (equipement.length > 0) {
				$scope.equipement = equipement[0];				
			}
			FicheFactory.all().success(function (fiches) {
				$scope.fiches = fiches;
				$('body').removeClass('loading');
				$('.sticker').sticky({ topSpacing: 75 });				
				$('#ficheSearchInput').focus();			
			});
		});
	};

	$scope.go = function (path) {
	  $location.path(path);
	};	


})




application.controller('ConfirmationController', function ($scope, $routeParams, $location, EquipementFactory, FicheFactory, EquipementFicheFactory) {

	init();

	function init () {
		$('body').addClass('loading');
		EquipementFactory.find($routeParams.equipement_code).success(function (equipement) {
			if (equipement.length > 0) {
				$scope.equipement = equipement[0];				
			}
			FicheFactory.find($routeParams.fiche_id).success(function (fiche) {
				$scope.fiche = fiche;
				$('body').removeClass('loading');
			});
		});		
	};


	$scope.confirm = function () {
		var fiche = {
			Equipement_Code: $scope.equipement.FUN_CODE,
			Equipement_Description: $scope.equipement.FUN_DESCR,
			Niveau_Description: $scope.equipement.NIV1_DESCR,
			Nom_Fichier: "\\parachemsrv07/" + $scope.fiche.DirName + $scope.fiche.LeafName,
		}
		EquipementFicheFactory.create(fiche).success(function (fiche) {
			console.log(fiche);
			$location.path('/home');
		})
	}

})







application.controller('UnlinkController', function ($scope, $location, EquipementFicheFactory) {

	init()

	function init () {
		$('body').addClass('loading');
		EquipementFicheFactory.all().success(function (links) {
			$scope.links = links
			$('body').removeClass('loading');
			$('#ficheSearchInput').focus();			
		})
	}

})



application.controller('UnlinkConfirmationController', function ($scope, $location, $routeParams, EquipementFicheFactory) {

	init()

	function init () {
		$('body').addClass('loading');
		EquipementFicheFactory.find($routeParams.link_id).success(function (link) {
			$scope.link = link
			$('body').removeClass('loading');
			$('#ficheSearchInput').focus();			
		})
	};


	$scope.confirm = function () {
		EquipementFicheFactory.delete($scope.link.id).success(function (link) {
			$location.path('/home');
		})
	}

})













