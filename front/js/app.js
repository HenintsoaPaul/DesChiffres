const app = angular.module("DesChiffresApp", ["ngRoute"]);

app.controller("mainCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.showJustify = false;
    $scope.numbers = [];
    $scope.seconds_length = 3;
    $scope.p1Validation = null;
    $scope.p2Validation = null;
    $scope.willJustify = null; // The player that will justify.
    $scope.idWinner = null;
    $scope.sumJustification = null;

    // Get numbers from C# API
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

    // Timer
    let intervalId;
    const timer = document.getElementById('timer');
    $scope.startCountdown = function () {
        $scope.getNumbers();

        clearInterval(intervalId);
        const startTime = new Date().getTime();
        const endTime = new Date(startTime).getTime() + ($scope.seconds_length * 1000);
        intervalId = setInterval(function () {
            const remainingTime = endTime - new Date().getTime();

            let minutes = Math.floor(remainingTime / 60000);
            let seconds = Math.floor((remainingTime % 60000) / 1000);
            // Pad numbers with leading zeros
            minutes = String(minutes).padStart(2, '0');
            seconds = String(seconds).padStart(2, '0');

            timer.textContent = `${minutes}:${seconds}`;
            if (remainingTime <= 0) {
                clearInterval(intervalId);
                timer.textContent = 'Time is Up';
                $scope.doSomethingAtZero();
            }
        }, 1000);
    };

    // When Timer 00:00
    $scope.doSomethingAtZero = function () {
        console.log('Temps écoulé!');

        $scope.$apply(function () {
            $scope.getInputs();
            $scope.getWinner();
        })

        $scope.p1Validation = null;
        $scope.p2Validation = null;
        $scope.willJustify = null;
        $scope.sumJustification = null;
        $scope.idWinner = null;
        $scope.showJustify = false;
        inpJustify.value = '';
    };

    // Set Values on Validation
    document.getElementById("btnSubmitP1").addEventListener("click", function (event) {
        event.preventDefault();
        const nbP1 = inputP1.value !== "" ? inputP1.value : -1;
        if (nbP1 !== -1) {
            $scope.p1Validation = {
                'nb': nbP1,
                'time': timer.textContent
            };
        }
    });
    document.getElementById("btnSubmitP2").addEventListener("click", function (event) {
        event.preventDefault();
        const nbP2 = inputP2.value !== "" ? inputP2.value : -1;
        if (nbP2 !== -1) {
            $scope.p2Validation = {
                'nb': nbP2,
                'time': timer.textContent
            };
        }
    });

    // Get Inputs
    const inputP1 = document.getElementById("nbP1");
    const inputP2 = document.getElementById("nbP2");
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
            $scope.justify();
            $scope.verifyJustification();
        }
    }

    // JUSTIFICATION
    const inpJustify = document.getElementById("inpJustify");
    const operationsElmnts = document.getElementsByClassName("op");
    const nbToolsElmnts = document.getElementsByClassName("nb-tool");

    $scope.justify = function () {
        // Show justification container
        console.log(`Player ${$scope.willJustify} is justifying...`);
        $scope.showJustify = true;

        // Add listeners on click on operations
        for (let i = 0; i < operationsElmnts.length; i++) {
            let op = operationsElmnts[i];
            op.addEventListener("click", function () {
                console.log(`You clicked an operation: ${op.textContent}`);

                inpJustify.value += op.textContent + " ";
            })
        }
        // Add listeners on click on numbers
        for (let i = 0; i < nbToolsElmnts.length; i++) {
            let nbTool = nbToolsElmnts[i];
            nbTool.addEventListener("click", function () {
                console.log(`You clicked a nb: ${nbTool.textContent}`);

                inpJustify.value += nbTool.textContent + " ";
                nbTool.remove();
            })
        }

        $scope.sumJustification = 5;
    }

    // SUBMIT JUSTIFICATION
    const btnSubmitJustify = document.getElementById("submitJustify");
    btnSubmitJustify.addEventListener('click', function (event) {
        event.preventDefault();

        const strJustification = inpJustify.value;
        const sumJustification = eval(strJustification);
        console.log(sumJustification);

        $scope.sumJustification = sumJustification;
    });

    // VERIFY JUSTIFICATION
    $scope.verifyJustification = function () {
        const idPlayer = $scope.willJustify;
        const nbGuess = $scope.numbers['nbGuess'];

        if ($scope.sumJustification === nbGuess) {
            $scope.idWinner = idPlayer;

            console.log(`Player ${idPlayer} is right. Winner is ${$scope.idWinner}.`);
            console.log("Both validates");
        }
        else {
            $scope.idWinner = $scope.getOpponent(idPlayer);

            console.log(`Player ${idPlayer} is wrong. Winner is ${$scope.idWinner}.`);
        }

        // Add winner point.
        // ...
    }

    // Get Opponent
    $scope.getOpponent = function (idPlayer) {
        if (idPlayer === 1) return 2;
        if (idPlayer === 2) return 1;
        return -1;
    }
}]);


