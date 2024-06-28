app.service('inputsService', function () {
    this.validateInputs = function ($scope) {
        if ($scope.guess === null) console.log("Guess is not defined!");
        else if ($scope.guess <= 0) console.log("Guess must be > 0!");
        else {
            if ($scope.tools.every(tool => (tool !== undefined && tool > 0))) {
                $scope.start = true;
                $scope.setThenGetNumbers({
                    NbGuess: $scope.guess,
                    NbTools: $scope.tools,
                });
            }
            else console.log("Tools ain't all defined or < 0!");
        }
    };
})