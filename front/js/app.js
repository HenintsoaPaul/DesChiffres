const app = angular.module("DesChiffresApp", ["ngRoute"]);

app.controller("mainCtrl", ['$scope', '$http', function ($scope, $http) {
    $scope.numbers = [];
    $scope.seconds_length = 5;
    $scope.p1Validation = null;
    $scope.p2Validation = null;

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
                timer.textContent = '00:00';
                $scope.doSomethingAtZero();
            }
        }, 1000);
    };

    // When Timer 00:00
    const inputP1 = document.getElementById("nbP1");
    const inputP2 = document.getElementById("nbP2");
    $scope.doSomethingAtZero = function () {
        console.log('Temps écoulé!');

        $scope.getInputs();

        $scope.getWinner();

        $scope.p1Validation = null;
        $scope.p2Validation = null;
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

        const t1 = $scope.p1Validation.time;
        const t2 = $scope.p2Validation.time;

        console.log(`p1: ${nbp1} and p2: ${nbp2}`);
        console.log(`t1: ${t1} and t2: ${t2}`);

        if (nbp1 === -1 && nbp2 === -1) {
            console.log("No Winner");
        }

        else if (nbp1 === -1 && nbp2 !== -1) {
            console.log("Winner 2");
        }

        else if (nbp1 !== -1 && nbp2 === -1) {
            console.log("Winner 1");
        }

        else {
            console.log("Both validates");
        }
    }
}]);


