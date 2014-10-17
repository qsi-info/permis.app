application.controller('HomeController', function ($scope, $http, ItemFactory) {

	init();

	function init() {
		ItemFactory.all().success(function (items) {
			console.log(items);
		})
	}

})