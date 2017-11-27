
angular
.module('myApp')
.controller('TopbarController', ['$http', 'URL_API', '$scope', '$uibModal',
function ($http, URL_API, $scope, $uibModal) {
	console.log('TopbarController');
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	console.log(userdata);
	$scope.authen = userdata;
	$http.get('multilingual.json') 
	.then(function (data) {
		$scope.multilingual = data.data
	}, function (error) {
		console.log('error');
	});
	$scope.regis = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'regisModal.html',
			controller: 'RegisModalController as ctrl'
			});
	};
	$scope.searchAPI = function() {
		console.log($scope.keyword);
		$http.post(URL_API + '/api/v1/search', {textSearch: $scope.keyword})
		.then(function(res){
			console.log(res.data.data);
			localStorage.setItem('search',JSON.stringify([$scope.keyword, res.data.data]));
			window.location.href = '/#/search';
			window.location.reload()
		}, function(err) {
			console.log(err.data);
		});;

	};
	$scope.logout = function(){
		$http.post(URL_API + '/api/v1/users/logout', {
			email: userdata.email,
		}).then(function(res){
			window.localStorage.clear();
			window.location.reload(true);
		}, function(err) {
			console.log(err.data);
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
	
	$scope.submitEmailLogin = function(){
		console.log($scope.login);
		authService.LoginByEmail($scope.login.username, $scope.login.password)
		.then((user) => {
			console.log(user);
			$http.get(URL_API + '/api/v1/users/'+user.data.data._id)
			.then( function(res){
				console.log(res);
			});
			$http({method: 'GET', url: URL_API + '/api/v1/users/'+user.data.data._id, 
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-access-token': user.data.data.accessToken,
				'x-user': user.data.data.email,
				'Authorization': 'Basic c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw=='
			}
			}).then( function(res){
				localStorage.setItem('userdata', JSON.stringify(res.data.data.profile));
		 		window.location.reload(true);
			});
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
		  localStorage.setItem('userdata', JSON.stringify(user.data.data));
		//   localStorage.setItem('token', user.data.data.accessToken);
			window.location.reload(true);
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
	FB.init({ 
        appId: '1668838553138058',
        status: true, 
        cookie: true, 
        xfbml: true,
        version: 'v2.4'
    });
	FB.login(function(response) {
		if (response.authResponse) {
		 console.log('Welcome!  Fetching your information.... ');
		 FB.api('/me?fields=id,name,email,first_name,last_name,age_range,picture.type(large)', function(response) {
		   console.log('Good to see you, ' + response.name + '.');
		   console.log(response);
		   console.log(response.perms);
			// $http.post(URL_API + '/api/v1/users/register', {
			// 	firstName: response.first_name,
			// 	lastName: response.last_name,
			// 	mobileNo: response.user_mobile_phone,
			// 	email: response.email,
			// 	imgUrl: response.picture.data.url,
			// 	socialId: response.id,
			// 	socialToken: response.first_name,
			// 	type: 'facebook',
			// }).then(function (res) {
			// 	$uibModalInstance.close(false);
			// 	window.location.reload();
			// 	console.log(res);
			
			// }, function (err) {
			// 	console.log(err.data);
			// });	



			// $http.post(URL_API + '/api/v1/users/login', {
			// 	username: response.first_name,
			// 	type: response.last_name,
			// 	credential: response.user_mobile_phone,
			// }).then(function (res) {
			// 	$uibModalInstance.close(false);
			// 	window.location.reload();
			// 	console.log(res);
			
			// }, function (err) {
			// 	console.log(err.data);
			// });		
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
	$scope.scrollTo = function(id) {
		$location.hash(id);
		$anchorScroll();
	 }
});

angular
.module('myApp')
.controller('JobsexpressModalController', function ($scope, $uibModal, $uibModalInstance, $http, URL_API) {
	console.log('JobsexpressModalController');
	$scope.lang = 'en';
	$http.get(URL_API + '/api/v1/job_types')
	.then( function(res){
				$scope.jobTypes = res.data.data;
				console.log(res.data.data);
	});
	$scope.selectjob = function () {
		$http.get(URL_API + '/api/v1/tags?jobType=' + $scope.datajob._id)
		.then( function(res){
				$scope.tags = res.data.data;
				console.log(res.data.data);
		});
	};
	$scope.submitJobExpress = function() {
		console.log($scope.postjob);
		console.log($scope.datajob._id);
		console.log($scope.datatag);

		$http.post(URL_API + '/api/v1/jobs', {
			name: $scope.postex.name,
			jobType: $scope.datajob._id,
			tag: $scope.datatag._id,
			price: $scope.postex.price,
            priceType: $scope.postex.jobunit,
            detail: $scope.postex.des,
            type: 'urgent',
						mobileNo: $scope.postex.tel,
						lineId: $scope.postex.line
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