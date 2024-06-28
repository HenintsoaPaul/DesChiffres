app.service('timerService', function () {
    this.start = function ($scope) {
        this.clearAllVariables($scope);
        this.startTimer($scope.seconds_length, $scope.doSomethingAtZero);
    };

    this.startTimer = function (secondsLength, doSomethingAtZero) {
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

    this.clearAllVariables = function ($scope) {
        $scope.p1Validation = null;
        $scope.p2Validation = null;
        $scope.willJustify = null;
        $scope.sumJustification = null;
        $scope.idWinner = null;
        $scope.showJustify = false;
        inpJustify.value = '';
        $scope.nbSubmitted = null;
        $scope.operationStr = undefined;
    }
});