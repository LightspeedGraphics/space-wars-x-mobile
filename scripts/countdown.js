
window.startCountdown = function(callback) {
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0, 0, 0, 0.85)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.fontSize = "64px";
  overlay.style.color = "white";
  overlay.style.fontFamily = "sans-serif";
  overlay.style.zIndex = 1000;
  document.body.appendChild(overlay);

  let seconds = 10;
  overlay.innerText = seconds;

  const interval = setInterval(() => {
    seconds--;
    overlay.innerText = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      overlay.remove();
      if (typeof callback === "function") callback();
    }
  }, 1000);
};
