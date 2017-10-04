
angular
.module('myApp')
.controller('HomeController', ['$scope', 
function ($scope) {
	console.log('HomeController');
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
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม08',
			tag: 'Korea',
			location: '2.8 km Lad Phrao'
		},
		{
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม02',
			tag: 'Korea',
			location: '5.6 km Chatuchak'
		},
		{
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม03',
			tag: 'Korea',
			location: '12 km Din Daeng'
		},
		{
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม04',
			tag: 'Korea',
			location: '27 km Lad Phrao'
		},
		{
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม05',
			tag: 'Japan',
			location: '34 km Din Daeng'
		},
		{
			img:'https://via.placeholder.com/186x278',
			name: 'ล่าม05',
			tag: 'Japan',
			location: '34 km Din Daeng'
		}
	];
	$scope.dataArray = [
		{
		  src: 'https://via.placeholder.com/1200x400'
		},
		{
		  src: 'https://via.placeholder.com/1200x400'
		},
		{
		  src: 'https://via.placeholder.com/1200x400'
		},
		{
		  src: 'https://via.placeholder.com/1200x400'
		},
		{
		  src: 'https://via.placeholder.com/1200x400'
		},
		{
		  src: 'https://via.placeholder.com/1200x400'
		}
	  ];

	  
	$scope.OnClick = function () {
		$state.go('experts');
		console.log('OnClick');
	};
}]);

