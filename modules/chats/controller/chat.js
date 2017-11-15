angular
.module('myApp')
.controller('ChatController', ['$scope', '$uibModal', 'socketio',
function ($scope, $uibModal, socketio) {
	console.log('ChatController');

	// $scope.tickets = Tickets.query();

	// socketio.on('ticket', function(msg){
	// 	$scope.tickets.push(msg);
	// });
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