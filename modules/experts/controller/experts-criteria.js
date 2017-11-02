
angular
.module('myApp')
.controller('ExpertsCriteriaController', ['$scope', '$http', 'URL_API',
function ($scope, $http, URL_API) {
	$http.defaults.headers.common['Authorization'] = 'Basic ' + 'c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==';
	console.log('ExpertsCriteriaController');
    $scope.lang = 'en';
    var currenturl = window.location.href;
    var jobTypesId = currenturl.substring(currenturl.search('/experts')+ 8);
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
    };
    $http.get(URL_API + '/api/v1/page/expert')
	.then( function(res){
		$scope.jobTypes = res.data.data.jobTypes;
	});
	$http.get(URL_API + '/api/v1/experts?jobType=' + jobTypesId + '&sortValue=-1')
	.then( function(res){
		$scope.experts = res.data.data;
	});
}]);

