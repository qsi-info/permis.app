angular.module('app.directives.test', [])
.directive('test', function () {
	return {
		restrict: 'E',
		scope: {
			equipements: '=data'
		},
		templateUrl: '/_api/templates?template=directives/test.ejs',
	}
})