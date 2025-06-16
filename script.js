const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const gameArea = document.getElementById("game-area");
const difficultySelection = document.getElementById("difficulty-selection");
const info = document.querySelector(".info");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let timeLeft = 0;
let gameTimer;
let clickTimer;
let gameActive = false;
let circleSize = 50;

const difficulties = {
  easy: { time: 40, size: 70 },
  medium: { time: 30, size: 60 },
  hard: { time: 20, size: 40 }
};

function moveCircle() {
  const maxX = gameArea.clientWidth - circle.offsetWidth;
  const maxY = gameArea.clientHeight - circle.offsetHeight;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;
  circle.style.left = `${randomX}px`;
  circle.style.top = `${randomY}px`;
}

function startGame(difficulty) {
  const settings = difficulties[difficulty];
  timeLeft = settings.time;
  circleSize = settings.size;
  circle.style.width = circle.style.height = `${circleSize}px`;
  score = 0;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  difficultySelection.classList.add("hidden");
  gameArea.classList.remove("hidden");
  info.classList.remove("hidden");
  gameOverScreen.classList.add("hidden");
  circle.style.display = "block";
  gameActive = true;
  moveCircle();
  startTimers();
}

function startTimers() {
  gameTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  resetClickTimer();
}

function resetClickTimer() {
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    endGame();
  }, 5000);
}

circle.addEventListener("click", () => {
  if (!gameActive) return;
  score++;
  scoreDisplay.textContent = score;
  moveCircle();
  resetClickTimer();
  circle.style.transform = "scale(1.2)";
  setTimeout(() => {
    circle.style.transform = "scale(1)";
  }, 100);
});

function endGame() {
  clearInterval(gameTimer);
  clearTimeout(clickTimer);
  gameActive = false;
  circle.style.display = "none";
  gameOverScreen.classList.remove("hidden");
  finalScore.textContent = score;
  gameArea.classList.add("hidden");
  info.classList.add("hidden");
  difficultySelection.classList.add("hidden");
}

restartBtn.addEventListener("click", () => {
  gameOverScreen.classList.add("hidden");
  difficultySelection.classList.remove("hidden");
});
  
difficultySelection.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", () => {
    startGame(button.dataset.difficulty);
  });
});
