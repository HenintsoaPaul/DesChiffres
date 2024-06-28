app.service('apiService', ['$http', function ($http) {
    this.getSolution = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:5138/Data/get'
        }).then(function(response) {
            const data = response.data;
            console.log(data);

        // Interpretation des resultats
            const listOperators = this.getListOperators(data);
            console.log(`List operators: ${listOperators}`);

            const firstOp = data[0];
            let operationStr =  `${firstOp[1]} ${this.getOperator(listOperators[0])} ${firstOp[2]}`;
            for (let i = 1; i < data.length; i++) {
                operationStr += ` ${this.getOperator(listOperators[i])} ${data[i][2]}`;
            }

            console.log("operation str: " + operationStr);
            console.log("sum = " + eval(operationStr))
        }.bind(this));
    }

    this.getListOperators = function (data) {
        let listOperators = [];
        for (let i = 0; i < data.length; i ++ ) listOperators.push(data[i][3]);
        return listOperators;
    }

    this.getOperator = function (idOperator) {
        switch (idOperator) {
            case 0: return "*";
            case 1: return "+";
            case 2: return "-";
            case 3: return "/";
        }
    }

    this.sendData = function(nbGuess, nbTools) {
        const jsonData = {
            NbGuess: nbGuess,
            NbTools: nbTools
        };
        console.log(`Sending json: ${jsonData}`);

        $http({
            method: 'POST',
            url: 'http://localhost:5138/Data/set',
            data: jsonData // Include the data here
        }).then(function(response) {
            console.log("Numbers sent successfully: ", response);
        }, function(error) {
            console.error("Error", error);
        });
    }
}]);
