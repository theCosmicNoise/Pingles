document.addEventListener("DOMContentLoaded", (event) => {
  const timerElement = document.getElementById("timer");
  const startButton = document.getElementById("startButton");
  const pauseButton = document.getElementById("pauseButton");
  const stopButton = document.getElementById("stopButton");
  const resetButton = document.getElementById("resetButton");
  const pingAudio = document.getElementById("pingAudio");
  const finishAudio = document.getElementById("finishAudio");

  let timerInterval;
  let countdownTime = 0;
  let isPaused = false;

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function updateTimer(pingInterval) {
    return function () {
      if (countdownTime > 0) {
        timerElement.textContent = formatTime(countdownTime);
        if (pingInterval > 0 && countdownTime % pingInterval === 0) {
          pingAudio.play();
        }
        countdownTime--;
      } else {
        clearInterval(timerInterval);
        timerElement.textContent = "00:00:00";
        finishAudio.play();
      }
    };
  }

  function resetInputs() {
    document.getElementById("hours").value = 0;
    document.getElementById("minutes").value = 0;
    document.getElementById("seconds").value = 0;
    document.getElementById("pingInterval").value = 0;
    timerElement.textContent = "00:00:00";
    pauseButton.textContent = "Pause Countdown";
    isPaused = false;
  }

  startButton.addEventListener("click", () => {
    const hours = parseInt(document.getElementById("hours").value, 10) || 0;
    const minutes = parseInt(document.getElementById("minutes").value, 10) || 0;
    const seconds = parseInt(document.getElementById("seconds").value, 10) || 0;
    const pingInterval =
      parseInt(document.getElementById("pingInterval").value, 10) || 0;

    countdownTime = hours * 3600 + minutes * 60 + seconds;

    clearInterval(timerInterval);

    pauseButton.textContent = "Pause Countdown";
    isPaused = false;

    timerInterval = setInterval(updateTimer(pingInterval), 1000);
  });

  pauseButton.addEventListener("click", () => {
    if (isPaused) {
      const pingInterval =
        parseInt(document.getElementById("pingInterval").value, 10) || 0;
      timerInterval = setInterval(updateTimer(pingInterval), 1000);
      pauseButton.textContent = "Pause Countdown";
      isPaused = false;
    } else {
      clearInterval(timerInterval);
      pauseButton.textContent = "Resume Countdown";
      isPaused = true;
    }
  });

  stopButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    resetInputs();
  });

  resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    resetInputs();
  });
  resetInputs();
});
