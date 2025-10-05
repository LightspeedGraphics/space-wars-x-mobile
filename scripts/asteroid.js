// asteroid.js

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
