angular.module('myApp').factory('myService', MyService);

function MyService($http){
    return {
        resetData: resetData
    }

    function resetData(){
        return $http({
            url: "http://localhost:3000/resetData",
            method: "GET",
            contentType: 'application/json',
        }).
        then(response => {
            return response.data;
        })
        .catch(error => {
            return response.data;
        })
    }
}