
angular
.module('myApp')
.filter('getDistance', function(){
	return function(locate){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
				this.latme = position.coords.latitude;
				this.lonme = position.coords.longitude;
				this.latex = locate.lat;
				this.lonex = locate.lon;
			});
		}
		function calcCrow(lat1, lon1, lat2, lon2) 
		{
			var R = 6371; // km
			var dLat = toRad(lat2-lat1);
			var dLon = toRad(lon2-lon1);
			var lat1 = toRad(lat1);
			var lat2 = toRad(lat2);
	
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c;
			return d;
		}
		function toRad(Value) 
		{
			return Value * Math.PI / 180;
		}
	   return Math.trunc(calcCrow(this.latme, this.lonme, this.latex, this.lonex)); 
	}
 })
.controller('HomeController', ['authService', '$uibModal', '$scope', '$http', 'URL_API', '$location', '$anchorScroll',
function (authService, $uibModal, $scope, $http, URL_API, $location, $anchorScroll) {
	console.log('HomeController');
	$scope.lang = 'en';
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.bannersarr = [];
	$scope.banner = {};
	$scope.experts = [];
	$scope.isLoggedIn = false;
	$scope.favexptId = [];
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
	$scope.slides =  [
		'http://lorempixel.com/560/400/sports/1',
		'http://lorempixel.com/560/400/sports/2',
		'http://lorempixel.com/560/400/sports/3',
		'http://lorempixel.com/560/400/sports/1',
		'http://lorempixel.com/560/400/sports/2',
		'http://lorempixel.com/560/400/sports/3'
	  ];
	$scope.backtotop = function() {
		// set the location.hash to the id of
		// the element you wish to scroll to.
		$location.hash('top');

		// call $anchorScroll()
		$anchorScroll();
	};
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
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
	$http.get(URL_API + '/api/v1/page/foryou')
	.then( function(res){
		console.log(res.data.data.experts);
		$scope.loaded = true;
		$scope.banners = res.data.data.banners;
		for(var i = 0; i < $scope.banners.length; i++){
			$scope.banner = {src:$scope.banners[i].imgUrl};
			$scope.bannersarr.push($scope.banner);
		}
		$scope.experts = res.data.data.experts;
		$scope.slidesex = $scope.experts[0].experts[0].thumbImgUrl;
		console.log($scope.experts[0].experts[0].thumbImgUrl);
		$scope.jobTypes = res.data.data.jobTypes;
		$scope.jobs = res.data.data.jobs;
	});
	$scope.jobsModal = function (jobid){
	var modalInstance = $uibModal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'jobModalHome.html',
		controller: 'JobsModalController as ctrl',
		resolve: {
			jobid: function() {
				return jobid;
			}
			}
		});
	};
	$scope.dataArray = [
		{src: 'http://via.placeholder.com/350x150'},
		{src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'},
		{src: 'http://via.placeholder.com/350x150'},
	]
}]);