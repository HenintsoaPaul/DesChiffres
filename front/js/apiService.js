app.service('apiService', ['$http', function ($http) {
    this.getData = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost:5138/Data/get-numbers'
        });
    }

    this.sendData = function(nbGuess, nbTools) {
        const dataToSend = {
            nbGuess: nbGuess,
            nbTools: nbTools
        };
        console.log(dataToSend);

        $http({
            method: 'POST',
            url: 'http://localhost:5138/Data/set-numbers',
            data: dataToSend // Include the data here
        }).then(function(response) {
            console.log("Success", response);
        }, function(error) {
            console.error("Error", error);
        });
    }
}]);
