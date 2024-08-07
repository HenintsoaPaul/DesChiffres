app.controller("mainCtrl", ['$scope', '$http', 'apiService', 'domService', 'timerService', 'inputsService',
    function ($scope, $http, apiService, domService, timerService, inputsService) {
        $scope.showJustify = false;
        $scope.numbers = [];
        $scope.operationStr = undefined;
        $scope.seconds_length = 10;
        $scope.p1Validation = null;
        $scope.p2Validation = null;
        $scope.willJustify = null; // The player that will justify.
        $scope.idWinner = null;
        $scope.sumJustification = null;
        $scope.nbSubmitted = null;
        $scope.start = false;
        $scope.tools = [];
        $scope.guess = null;

        // DOM
        // Timer
        $scope.startTimer = function () {
            timerService.start($scope);
        };

        $scope.getTimerValue = function (totalSeconds) {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Suggestion(Solution) -- Get solution from C# API, then display it
        $scope.showSolution = function () {
            domService.showSolution($scope);
        };

        // Inputs(Validation + Set numbers) -- Validate inputs and send it to the C# API, then set numbers
        $scope.validateInputs = function () {
            inputsService.validateInputs($scope);
        };

        // API
        // Get numbers from Inputs then send it to C# API then re-get data from C# API
        $scope.setThenGetNumbers = function (jsonData) {
            apiService.sendData(jsonData).then(data => {
                console.log(data);
                $scope.numbers = {
                    'nbGuess': data.nbGuess,
                    'nbTools': data.nbTools
                }
            });
        };

        const timer = document.getElementById('timer');
        const inpJustify = document.getElementById("inpJustify");

        domService.setupBtnValidatesListeners($scope);
        domService.setupBtnJustifyListeners($scope);

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