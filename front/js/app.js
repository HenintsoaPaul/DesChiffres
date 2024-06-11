const app = angular.module("DesChiffresApp", ["ngRoute"]);

app.controller("mainCtrl", ['$scope', '$http', function ($scope, $http) {
        $scope.numbers = [];

        $scope.getNumbers = function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:5138/Data/get-numbers'
            }).then(function (response) {
                console.log(response.data);
                $scope.numbers = response.data;
            }).catch(function (error) {
                console.error("Error getting JSON data: ", error);
            });
        };
    }]);
