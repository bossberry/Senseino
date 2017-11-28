angular
.module('myApp') 
.controller('ProfileController', ['authService', '$uibModal', '$scope', '$http', 'URL_API',
function (authService, $uibModal, $scope, $http, URL_API) {
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
		});
	}

	$scope.favExpt = function (exptsId){
		$http.put(URL_API + '/api/v1/users/favorite/' + userdata._id, {
			action: '$pull',
			expertId: exptsId
		}).then(function(res){
			$http({method: 'GET', url: URL_API + '/api/v1/users/'+ userdata._id, 
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-access-token': userdata.accessToken,
				'x-user': userdata.email,
				'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw=='
			}
			}).then( function(res){
				localStorage.setItem('userdata', JSON.stringify(res.data.data.profile));
		 		window.location.reload(true);
			});
		}, function(err) {
		});
			
	};
		$scope.user = userdata;
	

}]);

