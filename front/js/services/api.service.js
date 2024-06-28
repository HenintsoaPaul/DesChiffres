app.service('apiService', ['$http', 'solutionService', function ($http, solutionService) {
    this.getSolution = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost:5138/Data/get'
        }).then(
            response => solutionService.interpret(response.data)
        );
    }

    this.sendData = function (jsonData) {
        console.log(`Sending json: ${jsonData}`);
        return $http({
            method: 'POST',
            url: 'http://localhost:5138/Data/set',
            data: jsonData
        }).then(
            response => {
                console.log("Numbers sent successfully: ", response);
                return response.data;
            },
            error => console.error("Error", error)
        );
    }
}]);
