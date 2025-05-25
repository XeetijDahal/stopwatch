let startTime, interval, elapsed = 0;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("start-pause");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  const msPart = String(ms % 1000).padStart(3, '0').slice(0, 2); // 2-digit milliseconds
  return `${hrs}:${mins}:${secs}.${msPart}`;
}

function updateDisplay() {
  const currentTime = Date.now();
  const timePassed = currentTime - startTime + elapsed;
  display.textContent = formatTime(timePassed);
}

function startTimer() {
  startTime = Date.now();
  interval = setInterval(updateDisplay, 10); // update every 10ms
  isRunning = true;
  lapBtn.disabled = false;
  startPauseBtn.textContent = "Pause";
  startPauseBtn.style.backgroundColor = "#ffc107";
}

function pauseTimer() {
  clearInterval(interval);
  elapsed += Date.now() - startTime;
  isRunning = false;
  startPauseBtn.textContent = "Start";
  startPauseBtn.style.backgroundColor = "#28a745";
}

function resetTimer() {
  clearInterval(interval);
  elapsed = 0;
  isRunning = false;
  lapCount = 0;
  display.textContent = "00:00:00.00";
  startPauseBtn.textContent = "Start";
  startPauseBtn.style.backgroundColor = "#28a745";
  lapBtn.disabled = true;
  lapsList.innerHTML = "";
}

function addLap() {
  const currentTime = isRunning ? Date.now() - startTime + elapsed : elapsed;
  const lapTime = formatTime(currentTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${++lapCount}: ${lapTime}`;
  lapsList.prepend(li);
}

// Event Listeners
startPauseBtn.addEventListener("click", () => {
  isRunning ? pauseTimer() : startTimer();
});

resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
