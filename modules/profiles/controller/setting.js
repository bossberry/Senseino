angular
.module('myApp') 
.controller('SettingController', ['authService', '$uibModal', '$scope', '$http', 'URL_API',
function (authService, $uibModal, $scope, $http, URL_API) {
	console.log('SettingController');
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	$scope.lang = 'en';
	$scope.loaded = true;

	if (userdata) {
		authService.ensureAuthenticated(userdata)
		.then((user) => {
			if (user.data.status === 'success');
			$scope.isLoggedIn = true;
		})
		.catch((err) => {
			console.log(err);
		});
	}
	$scope.user = userdata;
	console.log($scope.user);

}]);

