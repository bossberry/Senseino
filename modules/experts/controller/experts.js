
angular
.module('myApp')
.controller('ExpertsController', ['$scope', '$http', 'URL_API',
function ($scope, $http, URL_API) {
	$http.defaults.headers.common['Authorization'] = 'Basic ' + 'c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==';
	console.log('ExpertsController');
	$scope.lang = 'en';
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.chgLang = function (lang){
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$http.get(URL_API + '/api/v1/page/expert')
	.then( function(res){
		console.log(res.data.data);
		$scope.jobTypes = res.data.data.jobTypes;
		$scope.experts = res.data.data.experts;
	});
	$scope.jobtype = [
		{
			img:'https://via.placeholder.com/100x100',
			name: 'ล่าม',
		},
		{
			img:'https://via.placeholder.com/100x100',
			name: 'นักแปล',
		},
		{
			img:'https://via.placeholder.com/100x100',
			name: 'ครูสอนภาษา',
		},
		{
			img:'https://via.placeholder.com/100x100',
			name: 'ติวเตอร์',
		},
		{
			img:'https://via.placeholder.com/100x100',
			name: 'ไกด์',
		},
		{
			img:'https://via.placeholder.com/100x100',
			name: 'พิธีกร',
		},
		{
			img:'https://via.placeholder.com/100x100',
			name: 'MC',
		},
		{
			img:'https://via.placeholder.com/100x100',
			name: 'ที่ปรึกษา',
		},
	];
	$scope.objects = [
		{
			id: 'id01',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม08',
			tag: 'Korea',
			location: '2.8 km Lad Phrao'
		},
		{
			id: 'id02',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม02',
			tag: 'Korea',
			location: '5.6 km Chatuchak'
		},
		{
			id: 'id03',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม03',
			tag: 'Korea',
			location: '12 km Din Daeng'
		},
		{
			id: 'id04',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม04',
			tag: 'Korea',
			location: '27 km Lad Phrao'
		},
		{
			id: 'id05',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม05',
			tag: 'Japan',
			location: '34 km Din Daeng'
		},
		{
			id: 'id06',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม05',
			tag: 'Japan',
			location: '34 km Din Daeng'
		}
	];
}]);

