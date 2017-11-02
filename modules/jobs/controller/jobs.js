angular
.module('myApp')
.controller('JobsController', ['$scope', '$uibModal', '$http', 'URL_API',
function ($scope, $uibModal, $http, URL_API) {
	console.log('JobsController');
	$scope.lang = 'en';
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$http.defaults.headers.common['Authorization'] = 'Basic ' + 'c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==';
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$http.get(URL_API + '/api/v1/page/job')
	.then( function(res){
		console.log(res.data.data);
		$scope.jobTypes = res.data.data.jobTypes;
		$scope.jobs = res.data.data.jobs;
	});
	$scope.jobsModal = function (jobdata){
	var modalInstance = $uibModal.open({
		animation: $scope.animationsEnabled,
		templateUrl: 'jobModal.html',
		controller: 'JobsModalController as ctrl',
		resolve: {
			jobdata: function() {
			  return jobdata;
			}
		  }
		});
	};
	$scope.jobspostModal = function() {
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: '่jobspostModal.html',
			controller: 'JobspostModalController as ctrl'
			});
	};
	$scope.jobstumbnail = [
		{
			img:'https://via.placeholder.com/76x76',
			name: 'งานล่าม',
		},
		{
			img:'https://via.placeholder.com/76x76',
			name: 'งานนักแปล',
		},{
			img:'https://via.placeholder.com/76x76',
			name: 'งานครูสอนภาษา',
		},{
			img:'https://via.placeholder.com/76x76',
			name: 'งานติวเตอร์',
		},{
			img:'https://via.placeholder.com/76x76',
			name: 'งานไกด์',
		},{
			img:'https://via.placeholder.com/76x76',
			name: 'งานพิธีกร',
		},{
			img:'https://via.placeholder.com/76x76',
			name: 'งานครู MC',
		},{
			img:'https://via.placeholder.com/76x76',
			name: 'งานที่ปรึกษา',
		}
	];
	$scope.postjob = [
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 3000,
			unit: 'ต่อชั่วโมง',
			status: 'NEW',
			tag: ['นักแปลก', 'English'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 8000,
			unit: 'ต่อวัน',
			status: 'NEW',
			tag: ['ล่าม', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 6000,
			unit: 'ต่องาน',
			status: 'IN PROGRESS',
			tag: ['ครูสอนภาษา', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 3000,
			unit: 'ต่อชั่วโมง',
			status: 'NEW',
			tag: ['นักแปลก', 'English'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 8000,
			unit: 'ต่อวัน',
			status: 'NEW',
			tag: ['ล่าม', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 6000,
			unit: 'ต่องาน',
			status: 'IN PROGRESS',
			tag: ['ครูสอนภาษา', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 6000,
			unit: 'ต่องาน',
			status: 'IN PROGRESS',
			tag: ['ครูสอนภาษา', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 6000,
			unit: 'ต่องาน',
			status: 'IN PROGRESS',
			tag: ['ครูสอนภาษา', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 6000,
			unit: 'ต่องาน',
			status: 'IN PROGRESS',
			tag: ['ครูสอนภาษา', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 6000,
			unit: 'ต่องาน',
			status: 'IN PROGRESS',
			tag: ['ครูสอนภาษา', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 6000,
			unit: 'ต่องาน',
			status: 'IN PROGRESS',
			tag: ['ครูสอนภาษา', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		},
		{
			topic:'ชื่อโพสงานและรายละเอียดรายละเอียดเบื้องต้นของงานที่ต้องการ',
			price: 6000,
			unit: 'ต่องาน',
			status: 'IN PROGRESS',
			tag: ['ครูสอนภาษา', 'Korea'],
			pic: 'https://via.placeholder.com/76x76',
			name: 'ชื่อคนโพส'
		}
	]
}]);

angular
.module('myApp')
.controller('JobsModalController', function ($scope, $uibModal, jobdata, $uibModalInstance) {
	console.log('modalController');
	console.log(jobdata);
	$scope.jobdatas = jobdata;
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
});

angular
.module('myApp')
.controller('JobspostModalController', function ($scope, $uibModal, $uibModalInstance) {
	console.log('JobspostModalController');
	$scope.closeMD = function() {
		$uibModalInstance.close(false);
	};
	
});