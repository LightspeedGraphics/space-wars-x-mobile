// audio.js

const sounds = {
  click: new Audio('assets/sfx/click.mp3'),
  shoot: new Audio('assets/sfx/shoot.mp3'),
  hit: new Audio('assets/sfx/hit.mp3'),
  explosion: new Audio('assets/sfx/explosion.mp3'),
  death: new Audio('assets/sfx/death.mp3'),
  levelup: new Audio('assets/sfx/levelup.mp3'),
  bgm: new Audio('assets/music/space_theme.mp3')
};

// Loop background music
sounds.bgm.loop = true;
sounds.bgm.volume = 0.3;

export function playSound(name) {
  if (sounds[name]) {
    // Clone for simultaneous playback (e.g., rapid shooting)
    const sfx = sounds[name].cloneNode();
    sfx.volume = sounds[name].volume ?? 1;
    sfx.play();
  }
}

export function startMusic() {
  sounds.bgm.play();
}

export function stopMusic() {
  sounds.bgm.pause();
  sounds.bgm.currentTime = 0;
}
