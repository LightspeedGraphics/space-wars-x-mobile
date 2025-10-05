// menu.js
import { startLevel } from './game.js';

const menu = document.getElementById('menu');
const startBtn = document.getElementById('startBtn');
const modeButtons = document.getElementById('modeButtons');
const singlePlayerBtn = document.getElementById('singlePlayerBtn');
const multiplayerBtn = document.getElementById('multiplayerBtn');
const countdown = document.getElementById('countdown');

let countdownTimer;

startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none';
  modeButtons.style.display = 'block';
});

function startCountdown(mode) {
  let timeLeft = 10;
  countdown.innerText = `Starting in ${timeLeft}...`;
  countdown.style.display = 'block';
  menu.style.display = 'none';

  countdownTimer = setInterval(() => {
    timeLeft--;
    countdown.innerText = `Starting in ${timeLeft}...`;

    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      countdown.style.display = 'none';

      if (mode === 'single') {
        startLevel();
      } else if (mode === 'multi') {
        waitForOpponent();
      }
    }
  }, 1000);
}

function waitForOpponent() {
  countdown.innerText = `Waiting for opponent...`;
  countdown.style.display = 'block';

  // Simulated matchmaking delay
  setTimeout(() => {
    startCountdown('single'); // simulate opponent found for now
  }, 3000);
}

singlePlayerBtn.addEventListener('click', () => {
  startCountdown('single');
});

multiplayerBtn.addEventListener('click', () => {
  startCountdown('multi');
});
