
angular
.module('myApp')
.directive("ngFileSelect",function(){
    
      return {
        link: function($scope,el){
          
          el.bind("change", function(e){
          
            $scope.file = (e.srcElement || e.target).files[0];
            $scope.getFile();
          })
          
        }
        
      }
})
.controller('ExpertsCreateController', ['$timeout', 'Upload', 'authService', '$scope', '$uibModal', '$http', 'URL_API',
function ($timeout, Upload, authService, $scope, $uibModal, $http, URL_API) {
    console.log('ExpertsCreateController');
	$scope.lang = 'en';
    $scope.isLoggedIn = false;
	const userdata = JSON.parse(localStorage.getItem('userdata'));
	console.log(userdata);
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
    $http.get(URL_API + '/api/v1/job_types')
	.then( function(res){
        $scope.loaded = true;
        $scope.jobTypes = res.data.data;
        console.log(res.data.data);
        console.log($scope.jobTypes[0]._id);
	});
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
    };
    $scope.selectjob = function () {
        console.log('selectjob');
        $http.get(URL_API + '/api/v1/tags?jobType=' + $scope.datajob._id)
        .then( function(res){
            $scope.tags = res.data.data;
            console.log(res.data.data);
        });
    };
    $scope.exptFileDel = function(data){
        console.log(data);
    }
  
    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
    };



    $scope.submitexpertsCreate = function () {
        console.log($scope.datajob._id);
        console.log($scope.user);
        console.log($scope.datatag);
        $http.post(URL_API + '/api/v1/experts', {
			name: $scope.user.exptname,
			jobType: $scope.datajob._id,
			tag: $scope.datatag._id,
			price: $scope.user.price,
            priceType: $scope.user.jobunit,
            location: $scope.user.price,
            detail: $scope.user.des,
            experience: $scope.user.exp,
            education: $scope.user.ed
            // pic:,
            // portfolio:
		}).then(function(res){
			console.log(res);
		}, function(err) {
			$scope.err = true;
			$scope.errmsg = err.data.description;
            console.log(err.data);
			
        });
    }
}]);

