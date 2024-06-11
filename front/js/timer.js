document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const timer = document.getElementById('timer');

    let intervalId;
    startBtn.addEventListener('click', function () {
        clearInterval(intervalId); // Clear any existing interval

        const seconds_length = 60;
        const startTime = new Date().getTime();
        const endTime = new Date(startTime).getTime() + (seconds_length * 1000);
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
            }
        }, 1000);
    });
})