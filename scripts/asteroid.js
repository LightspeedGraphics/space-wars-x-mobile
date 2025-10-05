// asteroid.js

// asteroid.js

export function createAsteroid(x, y, size) {
  const points = Math.floor(Math.random() * 3 + 5);
  const angleStep = (Math.PI * 2) / points;
  const offset = [];

  for (let i = 0; i < points; i++) {
    offset.push(Math.random() * 0.4 + 0.8);
  }

  return {
    x, y, size,
    angle: Math.random() * Math.PI * 2,
    speed: (Math.random() * 1 + 0.5) * (50 / size),
    direction: Math.random() * Math.PI * 2,
    offset
  };
}

export function updateAsteroid(ast) {
  ast.x += Math.cos(ast.direction) * ast.speed;
  ast.y += Math.sin(ast.direction) * ast.speed;

  // screen wrap
  if (ast.x < 0) ast.x += 800;
  if (ast.y < 0) ast.y += 600;
  if (ast.x > 800) ast.x -= 800;
  if (ast.y > 600) ast.y -= 600;
}

export function drawAsteroid(ctx, ast) {
  ctx.beginPath();
  const angleStep = (Math.PI * 2) / ast.offset.length;

  for (let i = 0; i < ast.offset.length; i++) {
    const angle = ast.angle + i * angleStep;
    const radius = ast.size * ast.offset[i];
    const x = ast.x + Math.cos(angle) * radius;
    const y = ast.y + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.stroke();
}


export class Asteroid {
  constructor(x, y, radius, vx, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen edges
    if (this.x < -this.radius) this.x = canvasWidth + this.radius;
    if (this.x > canvasWidth + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = canvasHeight + this.radius;
    if (this.y > canvasHeight + this.radius) this.y = -this.radius;
  }

  draw(ctx) {
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  checkCollision(targetX, targetY, targetRadius) {
    const dx = this.x - targetX;
    const dy = this.y - targetY;
    const distance = Math.hypot(dx, dy);
    return distance < this.radius + targetRadius;
  }
}

// Utility function to spawn a batch of asteroids
export function spawnAsteroids(num, canvasWidth, canvasHeight) {
  const asteroids = [];
  for (let i = 0; i < num; i++) {
    const radius = Math.random() * 20 + 10;
    const vx = (Math.random() - 0.5) * (3 - radius / 15);
    const vy = (Math.random() - 0.5) * (3 - radius / 15);
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    asteroids.push(new Asteroid(x, y, radius, vx, vy));
  }
  return asteroids;
}
