angular
.module('myApp')
.controller('ChatController', ['$scope', '$uibModal',
function ($scope, $uibModal) {
	console.log('ChatController');
	$scope.offerPrice = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'offerPriceModal.html',
			controller: 'OfferPriceModalController as ctrl'
			});
	};
}]);

angular
.module('myApp')
.controller('OfferPriceModalController', function ($scope, $uibModal, $uibModalInstance) {
	console.log('OfferPriceModalController');
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
});