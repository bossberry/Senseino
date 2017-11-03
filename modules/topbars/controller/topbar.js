
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
.controller('RegisModalController', function (authService, $location, URL_API, $http, $scope, $uibModal, $uibModalInstance) {
	console.log('RegisModalController');
	console.log(authService.test());
	$scope.submitEmailLogin = function(){
		console.log($scope.login);
		authService.LoginByEmail($scope.login.username, $scope.login.password)
		.then((user) => {
		//   console.log(user.data);
		  localStorage.setItem('token', user.data.data.accessToken);
		  localStorage.setItem('x-user', user.data.data.email);
		  localStorage.setItem('userid', user.data.data._id);
		  window.location.reload(true);
		})
		.catch((err) => {
		  console.log(err);
		  $scope.loginerr = true;
		  $scope.loginerrmsg = err.data.description;
		});


		// console.log($scope.login);
		// $http.post(URL_API + '/api/v1/users/login', {
		// 	username: $scope.login.username,
		// 	type: 'email',
		// 	credential: $scope.login.password
		// }).then(function(res){
		// 	console.log(res);
		// }, function(err) {
		// 	$scope.loginerr = true;
		// 	$scope.loginerrmsg = err.data.description;
        //     console.log(err.data);
			
		// });
	};

	$scope.submitEmailRegis = function() {
		console.log('Form is submitted with following user', $scope.user);

		authService.RegisByEmail($scope.user.firstname, $scope.user.lastname, $scope.user.tel, $scope.user.email, $scope.user.password)
		.then((user) => {
		  console.log(user.data);
		  localStorage.setItem('token', user.data.data.accessToken);
		})
		.catch((err) => {
		  console.log(err);
		  $scope.err = true;
		  $scope.errmsg = err.data.description;
		  console.log(err.data);
		});

		// $http.post(URL_API + '/api/v1/users/register', {
		// 	firstName: $scope.user.firstname,
		// 	lastName: $scope.user.lastname,
		// 	mobileNo: $scope.user.tel,
		// 	email:$scope.user.email,
		// 	type:'email',
		// 	password:$scope.user.password

		// }).then(function(res){
		// 	console.log(res);
		// }, function(err) {
		// 	$scope.err = true;
		// 	$scope.errmsg = err.data.description;
        //     console.log(err.data);
			
        // });
  };
  
  $scope.FBbtnLogin = function() {
	FB.login(function(response) {
		if (response.authResponse) {
		 console.log('Welcome!  Fetching your information.... ');
		 FB.api('/me?fields=id,name,email,first_name,last_name,age_range,picture.type(large)', function(response) {
		   console.log('Good to see you, ' + response.name + '.');
		   console.log(response);
		   console.log(response.perms);
		 }, {perms:'user_address, user_mobile_phone'});
		} else {
		 console.log('User cancelled login or did not fully authorize.');
		}
	});
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