app.controller("mainCtrl", ['$scope', '$http', 'apiService', 'domService', function ($scope, $http, apiService, domService) {
    $scope.showJustify = false;
    $scope.numbers = [];
    $scope.seconds_length = 5;
    $scope.p1Validation = null;
    $scope.p2Validation = null;
    $scope.willJustify = null; // The player that will justify.
    $scope.idWinner = null;
    $scope.sumJustification = null;
    $scope.nbSubmitted = null;
    $scope.start = false;
    $scope.tools = [];
    $scope.guess = null;

    $scope.clearVariables = function () {
        $scope.p1Validation = null;
        $scope.p2Validation = null;
        $scope.willJustify = null;
        $scope.sumJustification = null;
        $scope.idWinner = null;
        $scope.showJustify = false;
        inpJustify.value = '';
        $scope.nbSubmitted = null;
        // $scope.tools = [];
        // $scope.guess = null;
    }

    const btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", function () {
        $scope.$apply(function() {
            // Get inputs from the inputs
            console.log("guess: ",$scope.myNbGuess);
            console.log("tool1: ", $scope.myNbTool1);
            console.log("tool2: ", $scope.myNbTool2);
            console.log("tool3: ", $scope.myNbTool3);
            console.log("tool4: ", $scope.myNbTool4);
            console.log("tool5: ", $scope.myNbTool5);
            console.log("tool6: ", $scope.myNbTool6);
            console.log("tool7: ", $scope.myNbTool7);

            $scope.guess = $scope.myNbGuess;
            $scope.tools = [
                $scope.myNbTool1,
                $scope.myNbTool2,
                $scope.myNbTool3,
                $scope.myNbTool4,
                $scope.myNbTool5,
                $scope.myNbTool6,
                $scope.myNbTool7,
            ];
            if ($scope.guess !== undefined) {
                let allOk = true;
                for (let i = 0; i < $scope.tools.length; i++) {
                    if ($scope.tools[i] === undefined) {
                        allOk = false;
                        break;
                    }
                }

                if (allOk) {
                    console.log(`defined nbGuess`);
                    console.log(`defined nbTools`);

                    $scope.start = true;

                    // apiService.sendData($scope.guess, $scope.tools);

                    $scope.getNumbers();
                }
            }
        })
    })

    const timer = document.getElementById('timer');
    const inpJustify = document.getElementById("inpJustify");

    domService.setupBtnValidatesListeners($scope);
    domService.setupBtnJustifyListeners($scope);

    // Get numbers from C# API
    $scope.getNumbers = function () {

        // apiService.getData()
        //     .then(function (response) {
        //         $scope.numbers = response.data;
        //     }).catch(function (error) {
        //         console.error("Error getting JSON data: ", error);
        //     });

        $scope.numbers = {
            'nbGuess' : $scope.guess,
            'nbTools' : $scope.tools
        }

        console.log($scope.numbers);
    };

    $scope.timerValue = function (totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Timer
    $scope.startCountdown = function () {
        $scope.clearVariables();
        // $scope.getNumbers();
        domService.startTimer($scope.seconds_length, $scope.doSomethingAtZero);
    };

    // When Timer 00:00
    $scope.doSomethingAtZero = function () {
        console.log('Temps écoulé!');
        $scope.$apply(function () {
            $scope.getInputs();
            $scope.getWinner();
        })
    };

    // INPUTS
    $scope.getInputs = function () {
        if ($scope.p1Validation === null) {
            $scope.p1Validation = {
                'nb': -1,
                'time': '00:00'
            }
        }
        if ($scope.p2Validation === null) {
            $scope.p2Validation = {
                'nb': -1,
                'time': '00:00'
            }
        }
    }

    // WINNERS
    $scope.getWinner = function () {
        const nbp1 = $scope.p1Validation.nb;
        const nbp2 = $scope.p2Validation.nb;
        console.log(`p1: ${nbp1} and p2: ${nbp2}`);

        if (nbp1 === -1 && nbp2 === -1) {
            console.log("No one submit... You are LOSERS.");
            $scope.willJustify = null;
        }
        else if (nbp1 === -1 && nbp2 !== -1) {
            console.log("Player 2 submit");
            $scope.willJustify = 2;
        }
        else if (nbp1 !== -1 && nbp2 === -1) {
            console.log("Player 1 submit");
            $scope.willJustify = 1;
        }
        else {
            console.log("Both submits");
            const t1 = $scope.p1Validation.time;
            const t2 = $scope.p2Validation.time;
            console.log(`t1: ${t1} and t2: ${t2}`);

            // Get chiffres le plus proche de Guess
            const nbGuess = $scope.numbers['nbGuess'];
            const decal1 = Math.abs(nbGuess - nbp1);
            const decal2 = Math.abs(nbGuess - nbp2);
            if (decal1 < decal2) {
                console.log("player 1 submits the nearest");
                $scope.willJustify = 1;
            }
            else if (decal1 > decal2) {
                console.log("player 2 submits the nearest");
                $scope.willJustify = 2;
            }
            else if (decal1 === decal2) {
                console.log("player 1 and 2 submits numbers at the same distance");
                if (t1 > t2) {
                    console.log("player 1 submits first");
                    $scope.willJustify = 1;
                }
                else if (t1 < t2) {
                    console.log("player 2 submits first");
                    $scope.willJustify = 2;
                }
            }
        }

        if ($scope.willJustify === null) {
            console.log("No Winner... You are LOSERS.");
        }
        else {
            $scope.nbSubmitted = domService.getInputValue($scope.willJustify);
            console.log(`Set nbSubmitted to: ${$scope.nbSubmitted}`)
            // $scope.justify();
            domService.setupJustificationContainer($scope);
        }
    }

    // VERIFY JUSTIFICATION
    $scope.verifyJustification = function () {
        const idPlayer = $scope.willJustify;
        let winner = null;

        console.log(`sumJustification: ${$scope.sumJustification} | nbSubmitted: ${$scope.nbSubmitted}`)

        if (parseInt($scope.sumJustification) === parseInt($scope.nbSubmitted)) {
            winner = idPlayer;

            console.log(`Player ${idPlayer} is right. Winner is ${winner}.`);
        }
        else {
            winner = $scope.getOpponent(idPlayer);

            console.log(`Player ${idPlayer} is wrong. Winner is ${winner}.`);
        }

        $scope.$apply(function () {
            $scope.idWinner = winner;
        })
        // Increment winner point.
        // ...
    }

    // Get Opponent
    $scope.getOpponent = function (idPlayer) {
        if (idPlayer === 1) return 2;
        if (idPlayer === 2) return 1;
        return -1;
    }
}]);