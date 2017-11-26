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
	$scope.roomIdG = '';
	$scope.chatMsg = [];
	if(!userdata){
		window.location.href = '/'
	}else {
		$scope.userId = userdata._id
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
				console.log(res.data.data);
				$scope.chatRoom = res.data.data;
				for(var i = 0; i< res.data.data.length; i++){
					$scope.IDRoom.push(res.data.data[i]._id)
					if (res.data.data[i].employer._id === userdata._id ){
						// console.log('boss is Employer');
						// $scope.checkRole[i] = 'expertUser';
						if(res.data.data[i].expert!=null){
							$scope.checkRole[i] = 'expert';
						}else {
							$scope.checkRole[i] = 'expertUser';
						}
						
					} else {
						$scope.checkRole[i] = 'employer';
						// console.log('boss is ExpertUser');
					}
				}
				$scope.entryRoom(res.data.data[0]);
			}
		}, function (err) {
			window.location.href="/";
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
			$scope.exPic = null;
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
					console.log('iffff');
					$scope.btnOffPrice = false;
					$scope.roomName = room.expertUser.firstName + ' ' + room.expertUser.lastName;
					if(room.expert!=null){
						console.log('expert != null');
						$scope.exPic = room.expert.thumbImgUrl;
					}else {
						console.log('expert == null');
						$scope.exPic = room.expertUser.imgUrl;
					}
				} else {
					console.log('elsee');
					$scope.exPic = room.employer.imgUrl;
					// if(room.expert!=null){
					// 	console.log('expert != null');
					// 	$scope.exPic = room.expert.thumbImgUrl;
					// }else {
					// 	console.log('expert == null');
					// 	$scope.exPic = room.expertUser.imgUrl;
					// }
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
					console.log(res.data.data);
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
			$http({
				method: 'GET',
				url: URL_API + '/api/v1/quotations/' +roomData.quotation._id,
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
					},
					roomData : function() {
						return roomData;
					 }
				}
				});
			}, function (err) {
				console.log(err.data);
			});
			
		};
		$scope.updateQT = function(roomData) {
			console.log(roomData);
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'updateQT.html',
				controller: 'OfferPriceModalController as ctrl',
				resolve : { 
					roomData : function() {
					   return roomData;
					}
				}
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
	
		$scope.sendJob = function(room){
			$http.put(URL_API + '/api/v1/quotations/state/' + room.quotation._id, {
				state: 'closeJob'
			}).then(function (res) {
				window.location.reload();
				console.log(res);
			
			}, function (err) {
				console.log(err.data);
			});

		};
		$scope.acceptJob = function(room){
			$http.put(URL_API + '/api/v1/quotations/state/' + room.quotation._id, {
				state: 'acceptJob'
			}).then(function (res) {
				window.location.reload();
				console.log(res);
			
			}, function (err) {
				console.log(err.data);
			});

		};
		$scope.review = function (roomData) {
			console.log(roomData);
			var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'review.html',
			controller: 'ReviewModalController as ctrl',
			resolve : { 
				roomData : function() {
				   return roomData;
				}
			}
			});
		};
		$scope.hireAgain = function(room){
			$http.put(URL_API + '/api/v1/quotations/state/' + room.quotation._id, {
				state: 'newJob'
			}).then(function (res) {
				window.location.reload();
				console.log(res);
			
			}, function (err) {
				console.log(err.data);
			});

		};
		
		$scope.test = function() {
			console.log('test');
			document.getElementById('creditPaid').click();
	
		};
	}
}]);
angular
.module('myApp')
.controller('ViewOfferPriceModalController', function ($scope, $uibModal, $uibModalInstance, $http, URL_API, quotation, roomData) {
	$scope.lang = 'en';
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	$scope.vQT = quotation[0];
	$scope.rsdisc = $scope.vQT.price;
	var room = roomData;
	if (room.employer._id === userdata._id ){
		$scope.btnOffPrice = false;
	} else {
		$scope.btnOffPrice = true;
	}
	$scope.checkCode = function () {
		$scope.rsdisc = $scope.vQT.price;
		if($scope.codepro.length === 13){
			$http.get(URL_API + '/api/v1/promotions?code=' + $scope.codepro)
			.then( function(res){
				if(res.data.data.length>0){
					localStorage.setItem('rsCodeg', JSON.stringify(res.data.data[0]));
					$scope.rsCode = res.data.data[0];
					var price = parseInt($scope.vQT.price);
					var disc = $scope.rsCode.value/100;
					var amdisc = price * disc;
					$scope.rsdisc = $scope.rsdisc - amdisc; 
				}else {
					$scope.rsdisc = $scope.vQT.price;
					$scope.rsCode = false;
				}
			});
			
		} else {
			$scope.rsdisc = $scope.vQT.price;
			$scope.rsCode = false;
		}
		
	
	};
	
	$scope.checkpaid = function(rsdisc) {
		$scope.notpaid = false;
		if($scope.paidtype === "credit"){
			$uibModalInstance.close(false);
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'omisepaid.html',
				controller: 'OmiseModalController as ctrl',
				resolve : { 
					quotation : function() {
					return quotation;
					},
					rsdisc : function(){
						return rsdisc;
					}
				}
			});
		}else if ($scope.paidtype === "moneytran") {
			$uibModalInstance.close(false);
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'checkpaidModal.html',
				controller: 'ViewOfferPriceModalController as ctrl',
				resolve : { 
					quotation : function() {
					return quotation;
					},
					roomData : function(){
						return room;
					}
				}
			});
		} else {
			$scope.notpaid = true;
		}
		
		
	};
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	$scope.updateQT = function() {
		roomData = room;
		$uibModalInstance.close(false);
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'updateQT.html',
			controller: 'OfferPriceModalController as ctrl',
			resolve : { 
				roomData : function() {
				   return roomData;
				}
			}
		});
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
				},
				roomData : function(){
					return room;
				}
			}
		});
	};
	
	$scope.slipArray = [];
	$scope.slipup = [];
	$scope.uploadSlip = function(e){
		var files = e[0];
		$scope.slipup.push(files);
		var $reader = new FileReader();
		$reader.onload = function (e) {
			var result = e.target.result;
			$scope.slipArray.push(result);
			$scope.$apply();
		}
		$reader.readAsDataURL(files);
	};
	$scope.removeSlip = function(item) {
		$scope.slipArray.splice(item, 1);   
	};
	$scope.confirmPurchase = function () {
		const rsCodeg = JSON.parse(localStorage.getItem('rsCodeg'));
		
		// console.log($scope.slipup);
		// console.log($scope.vQT._id);
		// console.log(rsCodeg);
		var promoID = '';
		if(rsCodeg != null){
			promoID = rsCodeg._id;
		} else {
			promoID = '';
		}
		var fd = new FormData();
		fd.append('pic', $scope.slipup[0]);
		var url = URL_API + '/api/v1/upload';
		$http.post(url, fd, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined,
				'x-access-token': userdata.accessToken,
				"Authorization": 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw=='
			}
		}).then(function (res) {
				var fda = new FormData();
				fda.append('imgUrl', res.data.data.url);
				fda.append('channel', 'moneyTransfer');
				fda.append('quotationId', $scope.vQT._id);
				fda.append('promotionId', promoID);
		
				$http({
					method: 'POST',
					url: URL_API + '/api/v1/purchase',
					data: fda,
					transformRequest: angular.identity,
					headers: {
						'Content-Type': undefined,
						'x-access-token':userdata.accessToken,
						'x-user':userdata.email,
						'Authorization':'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw=='
					}
				}).then(function (res) {
					$scope.err = false;
					localStorage.removeItem('rsCodeg');
					$uibModalInstance.close(false);
					window.location.reload();
					console.log(res);
				
				}, function (err) {
					$scope.err = true;
					$scope.errmsg = err.data.description;
				});
			}, function (err) {
				$scope.err = true;
				$scope.errmsg = err.data.description;

		});
		// var fd = new FormData();
		// fd.append('imgUrl', $scope.slipArray);
		// fd.append('channel', 'moneyTransfer');
		// fd.append('quotationId', $scope.vQT._id);
		// if(rsCodeg != null){
		// 	fd.append('promotionId', rsCodeg._id);
		// } else {
		// 	fd.append('promotionId', '');
		// }
		// fd.append('promotionId', rsCodeg._id);
		
		
		// $http({
		// 	method: 'POST',
		// 	url: URL_API + '/api/v1/purchase',
		// 	data: fd,
		// 	// transformRequest: angular.identity,
		// 	headers: {
		// 		'Content-Type': undefined,
		// 		'x-access-token':userdata.accessToken,
		// 		'x-user':userdata.email,
		// 		'Authorization':'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw=='
		// 	}
		// }).then(function (res) {
		// 	$scope.err = false;
		// 	localStorage.removeItem('rsCodeg');
		// 	// $uibModalInstance.close(false);
		// 	// window.location.reload();
		// 	console.log(res);
		
		// }, function (err) {
		// 	$scope.err = true;
		// 	$scope.errmsg = err.data.description;
		// 	console.log(err.data);
		// });

		// $http({
		// 	method: 'POST',
		// 	url: URL_API + '/api/v1/purchase',
		// 	data: {
		// 		pic:fd,
		// 		channel:'moneyTransfer', 
		// 		quotationId:$scope.vQT._id, 
		// 		promotionId:rsCodeg._id
		// 	},
		// 	transformRequest: angular.identity,
		// 	headers: {
		// 		'Content-Type': undefined,
		// 		'x-access-token':userdata.accessToken,
		// 		'x-user':userdata.email,
		// 		'Authorization':'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw=='
		// 	}
		// }).then(function (res) {
		// 	$scope.err = false;
		// 	localStorage.removeItem('rsCodeg');
		// 	// $uibModalInstance.close(false);
		// 	// window.location.reload();
		// 	console.log(res);
		
		// }, function (err) {
		// 	$scope.err = true;
		// 	$scope.errmsg = err.data.description;
		// 	console.log(err.data);
		// });
	};
});
angular
.module('myApp')
.controller('OfferPriceModalController', function ($http, URL_API, $scope, $uibModal, $uibModalInstance, roomData) {
	$scope.lang = 'en';
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	$scope.qtData = roomData.quotation;

	$scope.updateQT = function (){
		$http.put(URL_API + '/api/v1/quotations/' + $scope.qtData._id, {
			name: $scope.qtData.name,
			employerId: $scope.qtData.employer,
			price: $scope.qtData.price,
			priceType: $scope.qtData.priceType,
			detail: $scope.qtData.detail,
			roomId: roomData._id,
			expertUserId: $scope.qtData.expert
		
		}).then(function (res) {
			$uibModalInstance.close(false);
			window.location.reload();
		
		}, function (err) {
			console.log(err.data);
		});
	};

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
			$uibModalInstance.close(false);
			window.location.reload();
			console.log(res);
		
		}, function (err) {
			console.log(err.data);
		});
		
	};
	


	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
});

angular
.module('myApp')
.controller('ReviewModalController', function ($http, URL_API, $scope, $uibModal, $uibModalInstance, roomData) {
	$scope.lang = 'en';
	const userdata = JSON.parse(localStorage.getItem('userdata'));

	if(roomData.expert != null) {
		$scope.workername = roomData.expert.name[$scope.lang];
		$scope.workerpic = roomData.expert.thumbImgUrl;
	} else {
		$scope.workername = roomData.expertUser.firstName + ' ' + roomData.expertUser.lastName;
		$scope.workerpic = roomData.expertUser.imgUrl;
	}

	$scope.sendReview = function() {
		console.log(roomData);
		console.log($scope.rating);
		console.log($scope.msgsend);
		$http.post(URL_API + '/api/v1/reviews', {
			quotationId: roomData.quotation._id,
			expertId: roomData.expert._id,
			rating: $scope.rating,
			note: $scope.msgsend,
			roomId: roomData._id,
		
		}).then(function (res) {
			$uibModalInstance.close(false);
			window.location.reload();
			console.log(res);
		
		}, function (err) {
			console.log(err.data);
		});
	};

	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
});

angular
.module('myApp')
.controller('OmiseModalController', function ($http, URL_API, $scope, $uibModal, $uibModalInstance, quotation, rsdisc) {
	$scope.lang = 'en';
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	console.log(quotation);
	console.log(rsdisc);
	$scope.amount = rsdisc * 100;
	$scope.omiseCon = function () {
		console.log('omiseCon');
		Omise.setPublicKey('pkey_test_55wt1kvw6lyyr2u7svp');
		var cardInformation = {
			name:             document.querySelector('[data-name="nameOnCard"]').value,
			number:           document.querySelector('[data-name="cardNumber"]').value,
			expiration_month: document.querySelector('[data-name="expiryMonth"]').value,
			expiration_year:  document.querySelector('[data-name="expiryYear"]').value,
			security_code:    document.querySelector('[data-name="securityCode"]').value
		  };
		
		  Omise.createToken('card', cardInformation, function(statusCode, response) {
			if (statusCode === 200) {
			  // Success: send back the TOKEN_ID to your server. The TOKEN_ID can be
			  // found in `response.id`.
			//   checkoutForm.omiseToken.value = response.id;
				console.log(response);
				// console.log(response.id);
				var datajson = JSON.stringify({channel:"creditCard",quotationId:quotation[0]._id, card:response.card.id, promotionId: ""});
				console.log(datajson);


				var parameter = JSON.stringify({channel:"creditCard",quotationId:quotation[0]._id, card:response.card.id, promotionId: ""});


				$http.post(URL_API + '/api/v1/purchase', parameter)
				.then(function (res) {
						// $scope.err = false;
						// localStorage.removeItem('rsCodeg');
						// $uibModalInstance.close(false);
						// window.location.reload();
						console.log(res);
					
					}, function (err) {
						console.log(err);
						$scope.err = true;
						$scope.errmsg = err.data;
					});
				// $http({
				// 	method: 'POST',
				// 	url: URL_API + '/api/v1/purchase',
				// 	data: datajson,
				// 	transformRequest: angular.identity,
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 		'x-access-token':userdata.accessToken,
				// 		'x-user':userdata.email,
				// 		'Authorization':'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw=='
				// 	}
				// }).then(function (res) {
				// 	// $scope.err = false;
				// 	// localStorage.removeItem('rsCodeg');
				// 	// $uibModalInstance.close(false);
				// 	// window.location.reload();
				// 	console.log(res);
				
				// }, function (err) {
				// 	console.log(err);
				// 	$scope.err = true;
				// 	$scope.errmsg = err.data;
				// });
			}
			else {
				console.log(response);
			  // Error: display an error message. Note that `response.message` contains
			  // a preformatted error message. Also note that `response.code` will be
			  // "invalid_card" in case of validation error on the card.
			}
		  });
	}
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
});