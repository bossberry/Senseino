
angular
.module('myApp')
.controller('CustomerController', ['$scope', 
function ($scope) {
	console.log('CustomerController');
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
}]);

