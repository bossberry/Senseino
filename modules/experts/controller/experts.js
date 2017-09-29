
angular
.module('myApp')
.controller('ExpertsController', ['$scope',
function ($scope) {
	console.log('ExpertsController');
	$scope.OnClick = function () {
		console.log('OnClick');
	};
}]);

