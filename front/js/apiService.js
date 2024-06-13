app.service('apiService', ['$http', function($http) {
    this.getData = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:5138/Data/get-numbers'
        });
    }
}]);
