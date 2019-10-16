var app = angular.module('myApp', []);


app.controller('myCtrl', function($scope, $http, myService) {

	$scope.resetData = function(){
		myService.resetData()
		.then(value => {
			$scope.value = value;
		})
		.catch(err => {
			console.log(err);
		});
	}
});