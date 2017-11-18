
angular
.module('myApp')
.controller('ExpertsDetailController', ['authService', '$scope', '$uibModal', '$http', 'URL_API',
function (authService, $scope, $uibModal, $http, URL_API) {
    console.log('ExpertsDetailController');
	$scope.lang = 'en';
	$scope.profilePicArr = [];
	$scope.loaded = false;
    var currenturl = window.location.href;
	var exid = currenturl.substring(currenturl.search('/experts-detail')+ 15);
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
	$scope.chatExpt = function () {
		if($scope.isLoggedIn){
			$http.post(URL_API + '/api/v1/rooms', 
			{
				employerId : userdata._id,
				expertId: $scope.exptID,
				expertUserId: $scope.exptUserId,
				message:"Hello world",
				createBy : "employer"
			}).then(function (res) {
					console.log(res);
					window.location.href = '/#/chat'
				}, function (err) {
					// console.log(err.data);
					if(err.data.code === 40022){
						window.location.href = '/#/chat'
					}else{
						console.log(err.data);
					}
			});
			
		} else {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'loginModal.html',
				controller: 'RegisModalController as ctrl'
			});
		}
	};
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$http.get(URL_API + '/api/v1/experts/' + exid)
	.then( function(res){
		$scope.loaded = true;
		$scope.exptdetail = res.data.data[0];
		console.log($scope.exptdetail);
		$scope.exptID = $scope.exptdetail._id;
		$scope.exptUserId = $scope.exptdetail.user._id;
		$scope.profilePic = $scope.exptdetail.profileImg;
		for(var i = 0; i < $scope.profilePic.length; i++){
			$scope.profilePic = {src:$scope.profilePic[i].url};
			$scope.profilePicArr.push($scope.profilePic);
		}
		
	});
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
	$scope.reviewModal = function(review) {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'reviewModal.html',
			controller: 'ReviewModalController as ctrl',
			resolve: {
				review: function() {
				  return review;
				}
			  }
		});
	};
}]);

angular
.module('myApp')
.controller('ReviewModalController', function ($scope, $uibModal, $uibModalInstance, review) {
	console.log('ReviewModalController');
	console.log(review);
	$scope.reviews = review
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	
});