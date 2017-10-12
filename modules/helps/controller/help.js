
angular
.module('myApp')
.controller('HelpController', ['$scope', 
function ($scope) {
	console.log('HelpController');
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

