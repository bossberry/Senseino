
angular
.module('myApp')
.controller('ExpertsController', ['$uibModal', 'authService', '$scope', '$http', 'URL_API',
function ($uibModal, authService, $scope, $http, URL_API) {
	console.log('ExpertsController');
	$scope.lang = 'en';
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.isLoggedIn = false;
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	
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
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$scope.exptCre = function (){
		if($scope.isLoggedIn){
			window.location.href = '/#/experts-create'
		} else {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'loginModal.html',
				controller: 'RegisModalController as ctrl'
			});
		}
	};
	$http.get(URL_API + '/api/v1/page/expert')
	.then( function(res){
		$scope.loaded = true;
		console.log(res.data.data);
		$scope.jobTypes = res.data.data.jobTypes;
		$scope.experts = res.data.data.experts;
	});
	
}]);

