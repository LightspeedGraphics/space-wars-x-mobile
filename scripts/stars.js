// stars.js

const starCount = 200;
const stars = [];

export function initStars(canvas) {
  stars.length = 0;
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.1
    });
  }
}

export function renderStars(ctx, offsetX = 0, offsetY = 0) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = 'white';
  stars.forEach(star => {
    star.x -= offsetX * star.speed;
    star.y -= offsetY * star.speed;

    if (star.x < 0) star.x = ctx.canvas.width;
    if (star.x > ctx.canvas.width) star.x = 0;
    if (star.y < 0) star.y = ctx.canvas.height;
    if (star.y > ctx.canvas.height) star.y = 0;

    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}
