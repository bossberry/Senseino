
angular
.module('myApp')
.controller('TopbarController', ['$scope', '$uibModal',
function ($scope, $uibModal) {
	console.log('TopbarController');
	$scope.regis = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'regisModal.html',
			controller: 'RegisModalController as ctrl'
			});
	};

	$scope.loginModal = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'loginModal.html',
			controller: 'RegisModalController as ctrl'
			});
	};
	$scope.jobsexpressModal = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: '่jobsexpressModal.html',
			controller: 'JobsexpressModalController as ctrl'
			});
	};
}]);

angular
.module('myApp')
.controller('RegisModalController', function ($scope, $uibModal, $uibModalInstance) {
	console.log('RegisModalController');
	$scope.submit = function() {
		console.log('Form is submitted with following user', $scope.user);
  };
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	$scope.regis = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'regisModal.html',
			controller: 'RegisModalController as ctrl'
			});
	};
	$scope.regisEmail = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'regisEmailModal.html',
			controller: 'RegisModalController as ctrl'
		});
	};
	$scope.loginModal = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'loginModal.html',
			controller: 'RegisModalController as ctrl'
			});
	};
});

angular
.module('myApp')
.controller('JobsexpressModalController', function ($scope, $uibModal, $uibModalInstance) {
	console.log('JobsexpressModalController');
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	
});