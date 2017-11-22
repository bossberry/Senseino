angular
.module('myApp') 
.controller('ProfileController', ['authService', '$uibModal', '$scope', '$http', 'URL_API',
function (authService, $uibModal, $scope, $http, URL_API) {
	console.log('ProfileController');
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

}]);

