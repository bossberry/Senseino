
angular
.module('myApp')
.controller('ExpertsDetailController', ['$scope',
function ($scope) {
    console.log('ExpertsDetailController');
    $scope.datadetail = 
		{
			id: 'id01',
			img:'https://via.placeholder.com/330x420',
			name: 'ล่าม08',
			tag: 'Korea',
			location: '2.8 km Lad Phrao'
        }
    ;
    $scope.review = [
        {
            img:'https://via.placeholder.com/50x50',
            name: 'Ronnie Holt',
            review: 'Hydroderm is the highly desired anti-aging cream on the block.'+
            'This serum restricts the occurrence of early aging sings on the skin and keeps the skin younger',
            point: 3
        },{
            img:'https://via.placeholder.com/50x50',
            name: 'Ronnie Holt',
            review: 'Hydroderm is the highly desired anti-aging cream on the block.'+
            'This serum restricts the occurrence of early aging sings on the skin and keeps the skin younger',
            point: 3
        },{
            img:'https://via.placeholder.com/50x50',
            name: 'Ronnie Holt',
            review: 'Hydroderm is the highly desired anti-aging cream on the block.'+
            'This serum restricts the occurrence of early aging sings on the skin and keeps the skin younger',
            point: 3
        }
    ];
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

