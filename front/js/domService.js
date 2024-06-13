app.service('domService', function() {
    // timer
    this.startTimer = function(secondsLength, doSomethingAtZero) {
        let intervalId;
        const startTime = new Date().getTime();
        const endTime = new Date(startTime).getTime() + (secondsLength * 1000);
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
                doSomethingAtZero();
            }
        }, 1000);
    };

    // Btn validations
    this.setupBtnValidatesListeners = function($scope) {
        document.getElementById("btnSubmitP1").addEventListener("click", function (event) {
            event.preventDefault();
            const inputP1 = document.getElementById("nbP1");
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
            const inputP2 = document.getElementById("nbP2");
            const nbP2 = inputP2.value !== "" ? inputP2.value : -1;
            if (nbP2 !== -1) {
                $scope.p2Validation = {
                    'nb': nbP2,
                    'time': timer.textContent
                };
            }
        });
    };

    // Get Input
    this.getInputValue = function(idPlayer) {
        if (idPlayer === 1) {
            return document.getElementById("nbP1").value;
        }
        else if (idPlayer === 2) {
            return document.getElementById("nbP2").value;
        }
    }

    // Justification container
    this.setupJustificationContainer = function ($scope) {
        // Show justification container
        console.log(`Player ${$scope.willJustify} is justifying...`);
        $scope.showJustify = true;

        // Add listeners on click on operations
        const operationsElmnts = document.getElementsByClassName("op");
        for (let i = 0; i < operationsElmnts.length; i++) {
            let op = operationsElmnts[i];
            op.addEventListener("click", function () {
                console.log(`You clicked operation: ${op.textContent}`);

                inpJustify.value += op.textContent + " ";
            })
        }

        // Add listeners on click on numbers
        const nbToolsElmnts = document.getElementsByClassName("nb-tool");
        for (let i = 0; i < nbToolsElmnts.length; i++) {
            let nbTool = nbToolsElmnts[i];
            nbTool.addEventListener("click", function () {
                console.log(`You clicked nb: ${nbTool.textContent}`);

                inpJustify.value += nbTool.textContent + " ";
                nbTool.remove();
            })
        }
    }

    // Btn Submit justify
    this.setupBtnJustifyListeners = function($scope) {
        const btnSubmitJustify = document.getElementById("submitJustify");
        btnSubmitJustify.addEventListener('click', function (event) {
            event.preventDefault();

            const strJustification = inpJustify.value;
            const sumJustification = eval(strJustification);
            console.log(`Evaluated sum: ${sumJustification}`);

            $scope.sumJustification = sumJustification;
            $scope.verifyJustification();
        });
    }
});