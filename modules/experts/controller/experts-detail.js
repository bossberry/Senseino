
angular
.module('myApp')
.controller('ExpertsDetailController', ['authService', '$scope', '$uibModal', '$http', 'URL_API',
function (authService, $scope, $uibModal, $http, URL_API) {
    console.log('ExpertsDetailController');
	$scope.lang = 'en';
    var currenturl = window.location.href;
	var exid = currenturl.substring(currenturl.search('/experts-detail')+ 15);
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
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$http.get(URL_API + '/api/v1/experts/' + exid)
	.then( function(res){
		$scope.loaded = true;
		$scope.exptdetail = res.data.data[0];
	});
	
	$scope.reviewModal = function(review) {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'reviewModal.html',
			controller: 'ReviewModalController as ctrl',
			resolve: {
				review: function() {
				  return review;
				}
			  }
		});
	};
}]);

angular
.module('myApp')
.controller('ReviewModalController', function ($scope, $uibModal, $uibModalInstance, review) {
	console.log('ReviewModalController');
	console.log(review);
	$scope.reviews = review
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	
});