
window.startSoloBot = function(playerShip, enemyShip, canvas) {
  // Assign the bot as the enemy ship that follows the player
  const botSpeed = 1.5;

  function moveBotTowardPlayer() {
    const dx = playerShip.x - enemyShip.x;
    const dy = playerShip.y - enemyShip.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 1) {
      enemyShip.x += (dx / dist) * botSpeed;
      enemyShip.y += (dy / dist) * botSpeed;
    }
  }

  // Hook into existing render loop
  const originalRender = window.render;
  window.render = function() {
    moveBotTowardPlayer();
    originalRender();
  };

  console.log("Solo bot started");
};
