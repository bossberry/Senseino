angular
.module('myApp')
.controller('JobsController', ['authService', '$scope', '$uibModal', '$http', 'URL_API',
function (authService, $scope, $uibModal, $http, URL_API) {
	console.log('JobsController');
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
	$http.get(URL_API + '/api/v1/page/job')
	.then( function(res){
		$scope.loaded = true;
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
		if($scope.isLoggedIn){
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '่jobspostModal.html',
				controller: 'JobspostModalController as ctrl'
				});
			
		} else {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'loginModal.html',
				controller: 'RegisModalController as ctrl'
			});
		}
	};

}]);

angular
.module('myApp')
.controller('JobsModalController', function (URL_API, $http, $scope, $uibModal, jobid, $uibModalInstance) {
	console.log('modalController');
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
.controller('JobspostModalController', function (URL_API, $http, $scope, $uibModal, $uibModalInstance) {
	$scope.lang = 'en';
	console.log('JobspostModalController');
	$http.get(URL_API + '/api/v1/job_types')
	.then( function(res){
				$scope.jobTypes = res.data.data;
				console.log(res.data.data);
	});
	$scope.selectjob = function () {
		console.log('selectjob');
		$http.get(URL_API + '/api/v1/tags?jobType=' + $scope.datajob._id)
		.then( function(res){
				$scope.tags = res.data.data;
				console.log(res.data.data);
		});
	};
	$scope.submitPostJob = function() {
		console.log($scope.postjob);
		console.log($scope.datajob._id);
		console.log($scope.datatag);

		$http.post(URL_API + '/api/v1/jobs', {
			name: $scope.postjob.name,
			jobType: $scope.datajob._id,
			tag: $scope.datatag._id,
			price: $scope.postjob.price,
            priceType: $scope.postjob.jobunit,
            detail: $scope.postjob.des,
            type: 'normal',
						mobileNo: $scope.postjob.tel,
						lineId: $scope.postjob.line
		}).then(function(res){
			console.log(res);
			window.location.reload(true);
		}, function(err) {
			$scope.err = true;
			$scope.errmsg = err.data.description;
      console.log(err.data);
			
    });

	};
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	
});