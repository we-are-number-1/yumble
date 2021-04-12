import express from 'express';
import http from 'http';
import path from 'path';
import socketio from 'socket.io';
import games from './domain/Games';
import {SocketSession} from './domain/models/SocketSession';
import * as SocketEvents from './sockets';
import * as mongo from './mongo/index';

// Routes
import sessionsRouteAPI from './routes/sessions';
import keysRouteAPI from './routes/keys';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
export {io};

require('dotenv').config();
app.use(express.json());

// API
app.use('/sessions', sessionsRouteAPI);
app.use('/api/keys', keysRouteAPI);

// MongoDB Setup
mongo.connect();
mongo.configureSessionIndexes();

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

if (process.env.NODE_ENV == 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const session = new SocketSession('test', null, {'roundInterval': 5000});

// This is just so eslint does not throw error
games.newGame(
    io,
    session,
    {
      length: 10,
    },
);

io.on('connection', (socket) => {
  console.log('a user connected with id:', socket.id);

  SocketEvents.disconnect(socket, io, () => {});
  SocketEvents.joinRoom(socket, io);
  SocketEvents.start(socket);
  SocketEvents.leaveRoom(socket, io, () => {});
  SocketEvents.setRestaurants(socket);
  SocketEvents.vote(socket);
  SocketEvents.hostRoom(socket, io);
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
