
# Space Wars X Mobile

A mobile-friendly multiplayer remake of the classic PDP-1 Spacewar!

## Features
- Touch-only controls for mobile
- Online matchmaking
- Real-time multiplayer over WebSockets

## How to Use

### Client (Frontend)
Open `client/index.html` in a mobile browser or host it (e.g. GitHub Pages).

### Server (Backend)
Use `server/server.js` with Node.js and install dependencies:

```bash
npm install express socket.io
node server.js
```

Or deploy it to Glitch using the contents of the `server/` folder.

## Live Matchmaking Server
The game connects to: `https://space-wars-x.glitch.me`
