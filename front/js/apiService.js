app.service('apiService', ['$http', function ($http) {
    this.getSolution = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:5138/Data/get'
        }).then(function(response) {
            const data = response.data;
            console.log(data);
        });
    }

    this.sendData = function(nbGuess, nbTools) {
        const jsonData = {
            NbGuess: nbGuess,
            NbTools: nbTools
        };
        console.log(jsonData);

        $http({
            method: 'POST',
            url: 'http://localhost:5138/Data/set',
            data: jsonData // Include the data here
        }).then(function(response) {
            console.log("Success", response);
        }, function(error) {
            console.error("Error", error);
        });
    }
}]);
