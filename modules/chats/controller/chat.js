angular
.module('myApp')
.directive('scroll', function() {
	var directive = {
		restrict: 'A',
		link: link
	};
	return directive;
	function link(scope, element, attrs) {
	var raw = element[0];
	element.bind('scroll', function () {
		// console.log('in scroll');
        // console.log(raw.scrollTop);
        // console.log(raw.scrollTop + raw.offsetHeight);
        // console.log(raw.scrollHeight);
		if (raw.scrollTop + raw.offsetHeight === raw.scrollHeight) {
		scope.$emit('reachBottom');
		}
		if (raw.scrollTop === 0) {
		scope.$emit('reachTop');
		}
	});
	}
})
.controller('ChatController', ['$scope', '$uibModal', 'URL_API', '$http',
function ($scope, $uibModal, URL_API, $http) {
	console.log('ChatController');
	$scope.chatRoom = [];
	$scope.IDRoom = [];
	$scope.checkRole = [];
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	$scope.userId = userdata._id
	$scope.roomIdG = '';
	if(!userdata){
		window.location.href = '/'
	}else {
		$scope.$on('reachTop', function(event, data) {
			$scope.getHistory();
		});

		$scope.getHistory = function(){
			$scope.isReachtop = true;
			var lastmsg = $scope.chatMsg[$scope.chatMsg.length-1]._id
			$http({
				method: 'GET',
				url: URL_API + '/api/v1/messages?roomId=' + $scope.roomIdG + '&pagination=' + lastmsg,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': userdata.accessToken,
					'lang': $scope.lang,
					'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
				}
			}).then(function (res) {
				console.log(res.data.data);
				$scope.isReachtop = false;
				// $scope.chatMsg = res.data.data;
			}, function (err) {
				console.log(err.data);
			});
		}
		console.log(userdata);
		var socket = null;
		var socket = io.connect('http://54.255.237.25:5000', {
			query: 'token=' + userdata.accessToken + '&lang=' + 'th'
		});
		socket.on('connect', function() {
			console.log('connect');
			socket.emit('pong', {beat: 1});
		});
		socket.on("error", function(error) {
			if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
				console.log('Error UnauthorizedError || invalid_token');
			}
		});
	
		$http({
			method: 'GET',
			url: URL_API + '/api/v1/rooms',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-access-token': userdata.accessToken,
				'lang': $scope.lang,
				'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
			}
		}).then(function (res) {
			if(res.data.data === 0){
				console.log(res);
			} else {
				$scope.chatRoom = res.data.data;
				for(var i = 0; i< res.data.data.length; i++){
					$scope.IDRoom.push(res.data.data[i]._id)
					if (res.data.data[i].employer._id === userdata._id ){
						console.log('boss is Employer');
						$scope.checkRole[i] = 'expertUser';
					} else {
						$scope.checkRole[i] = 'employer';
						console.log('boss is ExpertUser');
					}
				}
				// console.log(res.data.data);
				console.log($scope.chatRoom);
				socket.emit('room:joined',$scope.IDRoom);
				socket.on('room:joined', function(message){
					console.log(message);
				})
			}
		}, function (err) {
			console.log(err.data);
		});

		$scope.entryRoom = function(roomId){
			$scope.roomIdG = roomId
			console.log('entryRoom : ' + roomId);
			socket.emit('message:read',{"room":roomId, "user":userdata._id});
			socket.on('message:readed', function(message){
				console.log(message);
            })
			$http({
				method: 'GET',
				url: URL_API + '/api/v1/messages?roomId=' + roomId,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': userdata.accessToken,
					'lang': $scope.lang,
					'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
				}
			}).then(function (res) {
				console.log(res.data.data);
				$scope.chatMsg = res.data.data;
			}, function (err) {
				console.log(err.data);
			});
		};
		$scope.offerPrice = function() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'offerPriceModal.html',
				controller: 'OfferPriceModalController as ctrl'
				});
		};


	}
}]);

angular
.module('myApp')
.controller('OfferPriceModalController', function ($scope, $uibModal, $uibModalInstance) {
	console.log('OfferPriceModalController');
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
});