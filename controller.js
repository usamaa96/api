var app = angular.module('myApp', []);


app.controller('myCtrl', function($scope, $http, myService) {

	$scope.resetData = function(){
		myService.resetData()
		.then(value => {
			// console.log(value);
		})
		.catch(err => {
			// console.log(value);
		});
	}
});