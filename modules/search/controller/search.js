
angular
.module('myApp') 
.directive('myEnter', function () {
return function (scope, element, attrs) {
	element.bind('keydown keypress', function (event) {
	if (event.which === 13) {
		scope.$apply(function () {
		scope.$eval(attrs.myEnter);
		});
		event.preventDefault();
	}
	});
};
})
.controller('SearchController', ['authService', '$uibModal', '$scope', '$http', 'URL_API',
function (authService, $uibModal, $scope, $http, URL_API) {
	console.log('SearchController');
	var searchData = JSON.parse(localStorage.getItem('search'));
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	$scope.lang = 'en';
	$scope.loaded = true;
	$scope.qnull = false;
	if(searchData[1].experts.length === 0){
		$scope.qnull = true;
		$scope.keyword = searchData[0];
		$scope.expertdata = '';
		$scope.jobdata = '';
	} else {
		$scope.keyword = searchData[0];
		$scope.expertdata = searchData[1].experts;
		$scope.jobdata = searchData[1].jobs;
	}
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
	$scope.favExpt = function (exptsId, check){
		if($scope.isLoggedIn){
			console.log(exptsId);
			if(check === true){
				$http.put(URL_API + '/api/v1/users/favorite/' + userdata._id, {
					action: '$pull',
					expertId: exptsId
				}).then(function(res){
					console.log(res.data);
				}, function(err) {
					console.log(err.data);
				});
			} else {
				$http.put(URL_API + '/api/v1/users/favorite/' + userdata._id, {
					action: '$push',
					expertId: exptsId
				}).then(function(res){
					console.log(res.data);
				}, function(err) {
					console.log(err.data);
				});
			}
			
		} else {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'loginModal.html',
				controller: 'RegisModalController as ctrl'
			});
		}
	};
	$scope.jobsModal = function (jobid){
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'jobModalHome.html',
			controller: 'JobsModalController as ctrl',
			resolve: {
				jobid: function() {
					return jobid;
				}
				}
			});
	};
}]);

