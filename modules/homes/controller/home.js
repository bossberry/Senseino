
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
.controller('HomeController', ['authService', '$uibModal', '$scope', '$http', 'URL_API',
function (authService, $uibModal, $scope, $http, URL_API) {
	console.log('HomeController');
	$scope.lang = 'en';
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.bannersarr = [];
	$scope.banner = {};
	$scope.experts = [];
	$scope.isLoggedIn = false;
	const email = localStorage.getItem('x-user');
	const userid = localStorage.getItem('userid');
	if (email) {
	  authService.ensureAuthenticated(userid, email)
	  .then((user) => {
		if (user.data.status === 'success');
		$scope.isLoggedIn = true;
	  })
	  .catch((err) => {
		console.log(err);
	  });
	}
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$http.get(URL_API + '/api/v1/page/foryou')
	.then( function(res){
		$scope.loaded = true;
		$scope.banners = res.data.data.banners;
		for(var i = 0; i < $scope.banners.length; i++){
			$scope.banner = {src:$scope.banners[i].imgUrl};
			$scope.bannersarr.push($scope.banner);
		}
		$scope.experts = res.data.data.experts;
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
}]);