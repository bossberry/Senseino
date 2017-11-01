
angular
.module('myApp')
.filter('getDistance', ['$http', function(http){
	return function(locate){
	//    console.log(locate);
	//    console.log($scope.latme);
	//    return locate; 
	}
 }])
.controller('HomeController', ['$scope', '$http', 'URL_API',
function ($scope, $http, URL_API) {
	$http.defaults.headers.common['Authorization'] = 'Basic ' + 'c2Vuc2Vpbm86U2Vuc2Vpbm9AMjAxNw==';
	console.log('HomeController');
	$scope.lang = 'en';
	$scope.imglang = 'assets/img/' + $scope.lang + '.png';
	$scope.bannersarr = [];
	$scope.banner = {};
	$scope.chgLang = function (lang){
		console.log(lang);
		$scope.imglang = 'assets/img/' + lang + '.png';
		$scope.lang = lang;
	};
	$http.get(URL_API + '/api/v1/page/foryou')
	.then( function(res){
		$scope.banners = res.data.data.banners;
		for(var i = 0; i < $scope.banners.length; i++){
			$scope.banner = {src:$scope.banners[i].imgUrl};
			$scope.bannersarr.push($scope.banner);
			jkcarousel();
		}
		// console.log(res)
		
		console.log($scope.bannersarr);
	});
	$scope.jkcarousel = function (){
		return '<jk-carousel'+
		'data="bannersarr"'+
		'item-template-url="/modules/homes/views/item-template.html"'+
		'max-width="1920" '+
		'max-height="600"'+
		'auto-slide="true"'+
		'auto-slide-time="5000" >'+
		'</jk-carousel>';
	}
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
		  $scope.$apply(function(){
			$scope.position = position;
			$scope.latme = $scope.position.lat;
			$scope.lonme = $scope.position.lon;
		  });
		});
	  }
	 

	$scope.testimonials = [
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'},
		{img:'https://via.placeholder.com/150x100'}
	];
	$scope.course = [
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
		{
			img:'https://via.placeholder.com/150x100',
			topic:'ภาษาจีนระดับต้น 1B XXXX(--)บทที่ 13-25',
			descript:'ภาษาจีนระดับต้น 1B เรียนวันอังคาร, พฤหัสบดี 20.00 น.',
			amount: 1,
			full: 10,
			price: 1900,
			gen: 2,
			pic: 'https://via.placeholder.com/76x76'
		},
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
		}
	]
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
			name: 'ล่าม06',
			tag: 'Japan',
			location: '34 km Din Daeng'
		},
		{
			id: 'id07',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม07',
			tag: 'Japan',
			location: '34 km Din Daeng'
		},
		{
			id: 'id08',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม08',
			tag: 'Japan',
			location: '34 km Din Daeng'
		},
		{
			id: 'id09',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม09',
			tag: 'Japan',
			location: '34 km Din Daeng'
		},
		{
			id: 'id10',
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม10',
			tag: 'Japan',
			location: '34 km Din Daeng'
		}
	];
	$scope.dataArray = [
		{
		  src: 'https://via.placeholder.com/1920x600'
		},
		{
		  src: 'https://via.placeholder.com/1920x600'
		},
		{
		  src: 'https://via.placeholder.com/1920x600'
		},
		{
		  src: 'https://via.placeholder.com/1920x600'
		},
		{
		  src: 'https://via.placeholder.com/1920x600'
		},
		{
		  src: 'https://via.placeholder.com/1920x600'
		}
	  ];
	$scope.OnClick = function () {
		$state.go('experts');
		console.log('OnClick');
	};
}]);

