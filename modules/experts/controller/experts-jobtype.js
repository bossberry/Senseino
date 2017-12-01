
angular
.module('myApp')
.controller('ExpertsJobtypeController', ['$translate', 'authService', '$scope', '$http', 'URL_API',
function ($translate, authService, $scope, $http, URL_API) {
    $scope.lang = $translate.use();
    var currenturl = window.location.href;
    var jobTypesId = currenturl.substring(currenturl.search('/jobtype-experts')+ 16);
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
    $scope.tagArr = [];
	$http.get(URL_API + '/api/v1/experts?jobType=' + jobTypesId + '&sortValue=-1')
	.then( function(res){
        $scope.loaded = true;
        $scope.experts = res.data.data;
        for(var i = 0; i < $scope.experts.length; i++){
            $scope.tagArr.push($scope.experts[i].tag);
        }
    });
    $scope.tagfil = function (id){
        $http.get(URL_API + '/api/v1/experts?jobType=' + jobTypesId + '&tag=' + id +'&sortValue=-1')
        .then( function(res){
            $scope.loaded = true;
            $scope.experts = res.data.data;
        });
    }
}]);

