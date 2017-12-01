
angular
.module('myApp')
.controller('ExpertsCriteriaController', ['$translate', 'authService', '$scope', '$http', 'URL_API',
function (authService, $scope, $http, URL_API) {
    $scope.lang = $translate.use();
    var currenturl = window.location.href;
    var jobTypesId = currenturl.substring(currenturl.search('/experts')+ 8);
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.isLoggedIn = false;
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	
	if (userdata) {
		authService.ensureAuthenticated(userdata)
		.then((user) => {
		if (user.data.status === 'success');
		$scope.isLoggedIn = true;
		})
		.catch((err) => {
		});
	}
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
		$translate.use(lang);
    };
    $http.get(URL_API + '/api/v1/page/expert')
	.then( function(res){
		$scope.loaded = true;
		$scope.jobTypes = res.data.data.jobTypes;
	});
	$http.get(URL_API + '/api/v1/experts?jobType=' + jobTypesId + '&sortValue=-1')
	.then( function(res){
		$scope.experts = res.data.data;
	});
}]);

