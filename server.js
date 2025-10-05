
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

let waitingPlayer = null;
let gameIdCounter = 1;
const games = {};

app.get('/', (req, res) => {
  res.send("Space Wars X Matchmaker Online");
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  if (waitingPlayer) {
    const roomId = 'game_' + gameIdCounter++;
    games[roomId] = {
      players: [waitingPlayer, socket.id]
    };

    socket.join(roomId);
    io.to(waitingPlayer).emit('match_found', { roomId, player: 1 });
    socket.emit('match_found', { roomId, player: 2 });

    waitingPlayer = null;
  } else {
    waitingPlayer = socket.id;
    socket.emit('waiting');
  }

  socket.on('player_input', ({ roomId, input }) => {
    socket.to(roomId).emit('opponent_input', input);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    if (waitingPlayer === socket.id) {
      waitingPlayer = null;
    }

    for (let roomId in games) {
      const game = games[roomId];
      if (game.players.includes(socket.id)) {
        io.to(roomId).emit('opponent_disconnected');
        delete games[roomId];
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log('Server listening on', PORT);
});
