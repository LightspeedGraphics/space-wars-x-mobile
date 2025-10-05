// stars.js

const starCount = 200;
const stars = [];

export function initStars(ctx, width, height, count = 100) {
  const stars = Array.from({ length: count }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2,
  }));

  function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "white";
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  return { draw };
}


export function renderStars(ctx, offsetX = 0, offsetY = 0) {
  // Explicitly paint canvas black every frame
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform to avoid skew
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();

  // Draw stars
  ctx.fillStyle = 'white';
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.x -= offsetX * star.speed;
    star.y -= offsetY * star.speed;

    if (star.x < 0) star.x += ctx.canvas.width;
    if (star.x > ctx.canvas.width) star.x -= ctx.canvas.width;
    if (star.y < 0) star.y += ctx.canvas.height;
    if (star.y > ctx.canvas.height) star.y -= ctx.canvas.height;

    ctx.fillRect(star.x, star.y, star.size, star.size);
  }
}
