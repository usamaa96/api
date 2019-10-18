angular.module('myApp').factory('myService', MyService);

function MyService($http){
    return {
        getAllData: getAllData
    }

    function getAllData(){
        return $http({
            url: "http://192.168.0.42:9000/api/getAllStudents",
            method: "GET",
            contentType: "application/json"
        }).then(response => {
            return response;
        }).catch(error => {
            console.log(error);
        });
    }
}