
angular
.module('myApp')
.controller('HomeController', ['$scope', 
function ($scope) {
	console.log('HomeController');
	$scope.OnClick = function () {
		$state.go('experts');
		console.log('OnClick');
	};
}]);

