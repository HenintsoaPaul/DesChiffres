app.service('inputsService', function () {
    this.validateInputs = function ($scope) {
        if ($scope.guess === null) console.log("Guess is not defined!");
        else {
            if ($scope.tools.every(tool => tool !== undefined)) {
                $scope.start = true;
                $scope.setThenGetNumbers({
                    NbGuess: $scope.guess,
                    NbTools: $scope.tools,
                });
            }
            else console.log("Tools ain't all defined!");
        }
    };
})