
// Create the menu UI
const menu = document.createElement("div");
menu.style.position = "absolute";
menu.style.top = "50%";
menu.style.left = "50%";
menu.style.transform = "translate(-50%, -50%)";
menu.style.display = "flex";
menu.style.flexDirection = "column";
menu.style.alignItems = "center";
menu.style.justifyContent = "center";
menu.style.gap = "20px";
menu.style.padding = "40px";
menu.style.background = "rgba(0, 0, 0, 0.8)";
menu.style.border = "2px solid white";
menu.style.borderRadius = "12px";
menu.style.color = "white";
menu.style.fontFamily = "sans-serif";
menu.innerHTML = `
  <h1 style="margin: 0; font-size: 24px;">Space Wars X</h1>
  <button id="singleBtn" style="padding: 10px 20px; font-size: 18px;">Single Player</button>
  <button id="multiBtn" style="padding: 10px 20px; font-size: 18px;">Multiplayer</button>
`;
document.body.appendChild(menu);

const singleBtn = document.getElementById("singleBtn");
const multiBtn = document.getElementById("multiBtn");

singleBtn.onclick = () => {
  menu.remove();
  window.startGame("single");
};

multiBtn.onclick = () => {
  menu.remove();
  window.startGame("multi");
};
