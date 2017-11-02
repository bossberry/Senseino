angular
.module('myApp')
.controller('JobsController', ['$scope', '$uibModal', '$http', 'URL_API',
function ($scope, $uibModal, $http, URL_API) {
	console.log('JobsController');
	$scope.lang = 'en';
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$http.defaults.headers.common['Authorization'] = 'Basic ' + 'c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==';
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$http.get(URL_API + '/api/v1/page/job')
	.then( function(res){
		$scope.jobTypes = res.data.data.jobTypes;
		$scope.jobs = res.data.data.jobs;
	});
	$scope.jobsModal = function (jobid){
	var modalInstance = $uibModal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'jobModal.html',
		controller: 'JobsModalController as ctrl',
		resolve: {
			jobid: function() {
			  return jobid;
			}
		  }
		});
	};
	$scope.jobspostModal = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: '่jobspostModal.html',
			controller: 'JobspostModalController as ctrl'
			});
	};

}]);

angular
.module('myApp')
.controller('JobsModalController', function (URL_API, $http, $scope, $uibModal, jobid, $uibModalInstance) {
	console.log('modalController');
	$http.defaults.headers.common['Authorization'] = 'Basic ' + 'c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==';
	$scope.lang = 'en';
	$scope.id = jobid;
	$http.get(URL_API + '/api/v1/jobs/'+ $scope.id)
	.then( function(res){
		$scope.jobdatas = res.data.data[0];
	});
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
});

angular
.module('myApp')
.controller('JobspostModalController', function ($scope, $uibModal, $uibModalInstance) {
	console.log('JobspostModalController');
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	
});