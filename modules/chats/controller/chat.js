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
	$scope.lang = 'en';
	console.log('ChatController');
	$scope.chatRoom = [];
	$scope.IDRoom = [];
	$scope.checkRole = [];
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	$scope.userId = userdata._id
	$scope.roomIdG = '';
	$scope.chatMsg = [];
	if(!userdata){
		window.location.href = '/'
	}else {
		var socket = null;
		var socket = io.connect('http://54.255.237.25:5000', {
			query: 'token=' + userdata.accessToken + '&lang=' + 'th',
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax : 5000,
			reconnectionAttempts: 99999
		});
		socket.on('connect', function() {
			console.log('connect');
			socket.emit('pong', {beat: 1});
		});
		socket.on( 'disconnect', function () {
			console.log('disconnected to server');
			socket.connect();
		} );
		socket.on("error", function(error) {
			if (error.type == "UnauthorizedError" || error.code == "invalid_token") {
				console.log('Error UnauthorizedError || invalid_token');
			}
		});
		socket.on('room:joined', function(message){
					// console.log(message);
		});
		socket.on('message:broadcast', function(message){
			// console.log(message);
			// message.data[0];
			$scope.chatMsg.push(message.data[0]);
			$scope.updatelistRoom();
			$scope.$apply();
		});
		socket.on('message:readed', function(message){
				// console.log(message);
        });
		$http({
			method: 'GET',
			url: URL_API + '/api/v1/rooms',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-access-token': userdata.accessToken,
				'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
			}
		}).then(function (res) {
			if(res.data.data === 0){
				$scope.chatRoom = 0;
			} else {
				// console.log(res.data.data);
				$scope.chatRoom = res.data.data;
				for(var i = 0; i< res.data.data.length; i++){
					$scope.IDRoom.push(res.data.data[i]._id)
					if (res.data.data[i].employer._id === userdata._id ){
						// console.log('boss is Employer');
						$scope.checkRole[i] = 'expertUser';
						// if(res.data.data[i].expert!=null){
						// 	$scope.checkRole[i] = 'expert';
						// }else {
						// 	$scope.checkRole[i] = 'expertUser';
						// }
						
					} else {
						$scope.checkRole[i] = 'employer';
						// console.log('boss is ExpertUser');
					}
				}
				$scope.entryRoom(res.data.data[0]);
			}
		}, function (err) {
			console.log(err.data);
		});
		$scope.updatelistRoom = function() {
			$http({
				method: 'GET',
				url: URL_API + '/api/v1/rooms',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': userdata.accessToken,
					'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
				}
			}).then(function (res) {
				if(res.data.data === 0){
					$scope.chatRoom = 0;
				} else {
					$scope.chatRoom = res.data.data;
					for(var i = 0; i< res.data.data.length; i++){
						$scope.IDRoom.push(res.data.data[i]._id)
						if (res.data.data[i].employer._id === userdata._id ){
							$scope.checkRole[i] = 'expertUser';
						} else {
							$scope.checkRole[i] = 'employer';
						}
					}
				}
			}, function (err) {
				console.log(err.data);
			});
		};

		$scope.entryRoom = function(room){
			console.log(room);
			if(room === undefined){
				$scope.roomnotfound = true;
			}else {
				socket.emit('room:join',[room._id]);
				socket.emit('message:read',{"room":room._id, "user":userdata._id});
				$scope.roomDataG = room;
				$scope.Stateroom = room.state;
				$scope.Statemsg = room.stateMessage;
				$scope.chatMsg = [];
				$scope.roomIdG = room._id
				
				if (room.employer._id === userdata._id ){
					$scope.btnOffPrice = false;
					$scope.roomName = room.expertUser.firstName + ' ' + room.expertUser.lastName;
				} else {
					$scope.btnOffPrice = true;
					$scope.roomName = room.employer.firstName + ' ' + room.employer.lastName;
				}
				
				
				
				$http({
					method: 'GET',
					url: URL_API + '/api/v1/messages?roomId=' + room._id,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'x-access-token': userdata.accessToken,
						'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
					}
				}).then(function (res) {
					// console.log(res.data.data);
					for(var i = 0; i < res.data.data.length; i++){
						$scope.chatMsg.unshift(res.data.data[i]);
					}
				}, function (err) {
					console.log(err.data);
				});
			}
		};


		$scope.ChatupFile = function(e){
			var files = e[0];
			if (files.type === 'image/jpeg'){
				var picChatUp = [] ;
				picChatUp.push(files);
				var fd = new FormData();
				fd.append('file', picChatUp[0]);
				console.log(files.type);
				$scope.typeFile = 'image';
			} else {

			}
			
			$http.post(URL_API + '/api/v1/upload/chat', fd, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined,
					"Authorization": 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw=='
				}
			}).then(function (res) {
					if(res.data.data){
						console.log(res.data.data.url);
						socket.emit('message:send',{"room":$scope.roomIdG, "user":userdata._id, "message":res.data.data.url, "type": $scope.typeFile} );
					}else {
						console.log(res);
					}
				}, function (err) {
					console.log(err.data);

				});

		};
		$scope.chatPushMsg = function(e){
			socket.emit('message:send',{"room":$scope.roomIdG, "user":userdata._id, "message":$scope.msgsend, "type":"message"} );
			
			// socket.on('ping', function (message) {
            //     console.log(message);
            //     socket.emit('pong', {beat: 1});
            // });
		};

		$scope.$on('reachTop', function(event, data) {
			$scope.getHistory();
		});

		$scope.getHistory = function(){
			$scope.isReachtop = true;
			var lastmsg = $scope.chatMsg[0]._id;			
			$http({
				method: 'GET',
				url: URL_API + '/api/v1/messages?roomId=' + $scope.roomIdG + '&pagination=' + lastmsg,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': userdata.accessToken,
					'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
				}
			}).then(function (res) {
				$scope.isReachtop = false;
				for(var i = 0; i < res.data.data.length; i++){
					$scope.chatMsg.unshift(res.data.data[i]);
				}
			}, function (err) {
				console.log(err.data);
			});
		};
		// console.log(userdata);
	
		
		
		$scope.viewOfferPrice = function(roomData) {
			console.log(roomData);
			$http({
				method: 'GET',
				url: URL_API + '/api/v1/quotations/' +roomData.quotation,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': userdata.accessToken,
					'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
				}
			}).then(function (res) {
				// console.log(res);
				var quotation = res.data.data;
				var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'viewOfferPriceModal.html',
				controller: 'ViewOfferPriceModalController as ctrl',
				resolve : { 
					quotation : function() {
					   return quotation;
					}
				}
				});
			}, function (err) {
				console.log(err.data);
			});
			
		};
		$scope.OfferPrice = function(roomData) {
			console.log(roomData);
			var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'offerPriceModal.html',
			controller: 'OfferPriceModalController as ctrl',
			resolve : { 
				roomData : function() {
				   return roomData;
				}
			}
			});
		};


	}
}]);
angular
.module('myApp')
.controller('ViewOfferPriceModalController', function ($scope, $uibModal, $uibModalInstance, quotation) {
	$scope.lang = 'en';
	console.log('ViewOfferPriceModalController');
	console.log(quotation[0]);
	$scope.vQT = quotation[0]
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	$scope.paid = function() {
		$uibModalInstance.close(false);
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'paidModal.html',
			controller: 'ViewOfferPriceModalController as ctrl',
			resolve : { 
				quotation : function() {
				   return quotation;
				}
			}
		});
	};
	$scope.checkpaid = function() {
		$uibModalInstance.close(false);
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'checkpaidModal.html',
			controller: 'ViewOfferPriceModalController as ctrl',
			resolve : { 
				quotation : function() {
				   return quotation;
				}
			}
		});
	}
});
angular
.module('myApp')
.controller('OfferPriceModalController', function ($http, URL_API, $scope, $uibModal, $uibModalInstance, roomData) {
	console.log('OfferPriceModalController');
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	console.log(roomData);
	console.log(userdata);
	$scope.creQT = function (){
		console.log($scope.workname);
		console.log($scope.workprice);
		console.log($scope.workjobunit);
		console.log($scope.workdes);
		$http.post(URL_API + '/api/v1/quotations', {
			name: $scope.workname,
			employerId: roomData.employer._id,
			price: $scope.workprice,
			priceType: $scope.workjobunit,
			detail: $scope.workdes,
			roomId: roomData._id,
			expertUserId: userdata._id
		
		}).then(function (res) {
			console.log(res);
		
		}, function (err) {
			console.log(err.data);
		});
		
	};
	


	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
});