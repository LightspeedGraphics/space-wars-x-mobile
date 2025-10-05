// game.js (simplified using asteroid.js)

import { initStars, renderStars } from './stars.js';
import { createAsteroid, updateAsteroid, drawAsteroid } from './asteroid.js';

initStars(canvas);

// Inside render loop
renderStars(ctx, player.vx, player.vy);
asteroids.forEach(ast => {
  updateAsteroid(ast);
  drawAsteroid(ctx, ast);
});


import { playSound, startMusic, stopMusic } from './audio.js';

playSound('click');       // For menu interaction
playSound('shoot');       // When firing
playSound('explosion');   // When asteroid breaks
playSound('death');       // When player loses

startMusic();             // On game start
stopMusic();              // On game over or menu return


import { Asteroid, spawnAsteroids } from './asteroid.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player;
let bullets = [];
let asteroids = [];
let score = 0;
let gameOver = false;
let level = 1;
let keys = {};

const playerRadius = 20;

function initPlayer() {
  player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: playerRadius,
    angle: 0,
    speed: 4
  };
}

function drawPlayer(ctx, player) {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.rotation);

  ctx.beginPath();
  ctx.moveTo(10, 0);      // Tip of triangle
  ctx.lineTo(-10, 7);     // Bottom left
  ctx.lineTo(-10, -7);    // Bottom right
  ctx.closePath();

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}


function updatePlayer() {
  if (keys['w']) {
    player.y -= player.speed;
  }
  if (keys['s']) {
    player.y += player.speed;
  }
  if (keys['a']) {
    player.x -= player.speed;
  }
  if (keys['d']) {
    player.x += player.speed;
  }

  // Keep player within bounds
  player.x = Math.max(0, Math.min(canvas.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height, player.y));
}

function shootBullet() {
  const bullet = {
    x: player.x,
    y: player.y,
    vx: Math.cos(player.angle) * 6,
    vy: Math.sin(player.angle) * 6,
    radius: 4
  };
  bullets.push(bullet);
}

function updateBullets() {
  bullets = bullets.filter((b) => {
    b.x += b.vx;
    b.y += b.vy;
    return (
      b.x > 0 && b.x < canvas.width && b.y > 0 && b.y < canvas.height
    );
  });
}

function drawBullets() {
  ctx.fillStyle = 'red';
  bullets.forEach((b) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function checkCollisions() {
  for (let i = asteroids.length - 1; i >= 0; i--) {
    if (asteroids[i].checkCollision(player.x, player.y, player.radius)) {
      gameOver = true;
      break;
    }

    for (let j = bullets.length - 1; j >= 0; j--) {
      if (asteroids[i].checkCollision(bullets[j].x, bullets[j].y, bullets[j].radius)) {
        asteroids.splice(i, 1);
        bullets.splice(j, 1);
        score += 100;
        break;
      }
    }
  }
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px monospace';
  ctx.fillText(`Score: ${score}`, 20, 30);
}

function drawGameOver() {
  ctx.fillStyle = 'white';
  ctx.font = '40px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`Game Over`, canvas.width / 2, canvas.height / 2 - 30);
  ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2);
  ctx.fillText(`Press R to Retry`, canvas.width / 2, canvas.height / 2 + 40);
}

function nextLevel() {
  level++;
  asteroids = spawnAsteroids(
    Math.floor(5 * Math.pow(1.05, level)), 
    canvas.width, 
    canvas.height
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameOver) {
    drawGameOver();
    return;
  }

  updatePlayer();
  updateBullets();
  asteroids.forEach(a => a.update(canvas.width, canvas.height));
  checkCollisions();

  drawPlayer();
  drawBullets();
  asteroids.forEach(a => a.draw(ctx));
  drawScore();

  if (asteroids.length === 0) {
    nextLevel();
  }

  requestAnimationFrame(gameLoop);
}

export function startLevel() {
  gameOver = false;
  level = 1;
  score = 0;
  initPlayer();
  asteroids = spawnAsteroids(5, canvas.width, canvas.height);
  gameLoop();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    player.rotation -= 0.1; // rotate left
  } else if (e.key === 'd') {
    player.rotation += 0.1; // rotate right
  } else if (e.key === 'w') {
    player.vx += Math.cos(player.rotation) * 0.2;
    player.vy += Math.sin(player.rotation) * 0.2;
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});
