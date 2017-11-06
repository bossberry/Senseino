
angular
.module('myApp')
.controller('HelpController', ['$timeout', 'authService', '$uibModal', '$scope', '$http', 'URL_API',
function ($timeout, authService, $uibModal, $scope, $http, URL_API) {
	console.log('HelpController');
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	$scope.lang = 'en';
	$scope.isLoggedIn = false;
	if (userdata) {
		authService.ensureAuthenticated(userdata)
		.then((user) => {
			if (user.data.status === 'success');
			$scope.isLoggedIn = true;
			$scope.loaded = true;
		})
		.catch((err) => {
			$scope.loaded = true;
			console.log(err);
		});
	}else {
		$scope.loaded = true;
	}
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$scope.groups = [
		{
		  title: 'FAQ - 1',
		  content: 'คำตอบ รายละเอียดคำตอบรายละเอียด' +
		  'รายละเอียดคำตอบรายละเอียดรายละเอียดคำตอบ' + 
		  'รายละเอียดรายละเอียดคำตอบรายละเอียดรายละเอียด' + 
		  'รายละเอียดรายละเอียดคำตอบรายละเอียดรายละเอียด' + 
		  'รายละเอียดรายละเอียดคำตอบรายละเอียดรายละเอียด' + 
		  'รายละเอียดรายละเอียดคำตอบรายละเอียดรายละเอียด'
		},
		{
		  title: 'FAQ - 2',
		  content: 'Dynamic Group Body - 2'
		},
		{
		  title: 'FAQ - 3',
		  content: 'Dynamic Group Body - 3'
		},
		{
		  title: 'FAQ - 4',
		  content: 'Dynamic Group Body - 4'
		}
	  ];
}]);

