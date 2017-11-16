angular
.module('myApp')
.controller('ChatController', ['$scope', '$uibModal', 'URL_API', '$http',
function ($scope, $uibModal, URL_API, $http) {
	console.log('ChatController');
	$scope.chatRoom = [];
	$scope.IDRoom = [];
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	if(!userdata){
		window.location.href = '/'
	}else {

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
				// 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjU5ZTIwYmUwYTc0YzM4NzY5MmY0OGIzNyIsImZpcnN0TmFtZSI6IkF0dGhhcG9uIiwibGFzdE5hbWUiOiJLZXRoaXJhbiIsIm1vYmlsZU5vIjoiMDg3MTExMDgyNSIsImVtYWlsIjoiYXR0aGFwb24ua3JAZ21haWwuY29tIn0sImlhdCI6MTUxMDc5NzA4MywiZXhwIjoxNzY5OTk3MDgzfQ.stVYAnN1OQ0IJVCd90NzWgGrMwoYvoLWjmgIrZkAmpQ',
				'lang': $scope.lang,
				'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
			}
		}).then(function (res) {
			if(res.data.data === 0){
				console.log(res);
			} else {
				
				for(var i = 0; i< res.data.data.length; i++){
					console.log(i + ' : ' + res.data.data[i]);
					$scope.chatRoom.push(res.data.data[i]);
					$scope.IDRoom.push(res.data.data[i]._id)
				}
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
			console.log('entryRoom : ' + roomId);
			$http({
				method: 'GET',
				url: URL_API + '/api/v1/messages?roomId=' + roomId,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': userdata.accessToken,
					// 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjU5ZTIwYmUwYTc0YzM4NzY5MmY0OGIzNyIsImZpcnN0TmFtZSI6IkF0dGhhcG9uIiwibGFzdE5hbWUiOiJLZXRoaXJhbiIsIm1vYmlsZU5vIjoiMDg3MTExMDgyNSIsImVtYWlsIjoiYXR0aGFwb24ua3JAZ21haWwuY29tIn0sImlhdCI6MTUxMDc5NzA4MywiZXhwIjoxNzY5OTk3MDgzfQ.stVYAnN1OQ0IJVCd90NzWgGrMwoYvoLWjmgIrZkAmpQ',
					'lang': $scope.lang,
					'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==',
				}
			}).then(function (res) {
				console.log(res.data.data);
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