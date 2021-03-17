import express from 'express';
import http from 'http';
import path from 'path';
import socketio from 'socket.io';
import mongoose from 'mongoose';
import games from './domain/Games';
import * as SocketEvents from './sockets';

// Routes
import sessionsRouteAPI from './routes/sessions';
import preferencesRouteAPI from './routes/preferences';
import resultsRouteAPI from './routes/results';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('dotenv').config();
app.use(express.json());

// API
app.use('/sessions', sessionsRouteAPI);
app.use('/preferences', preferencesRouteAPI);
app.use('/results', resultsRouteAPI);

const mongoUri = process.env.ATLAS_URI;
mongoose.connect(
    mongoUri,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Successfully connected to MongoDB Atlas.`);
      }
    },
);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

if (process.env.NODE_ENV == 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

io.on('connection', (socket) => {
  console.log('a user connected with id:', socket.id);

  SocketEvents.disconnect(socket);
  SocketEvents.joinRoom(socket, io);
  SocketEvents.start(socket);
  // This is just so eslint does not throw error
  games.newGame(
      io,
      {
        sessionId: 1234,
        preferences: {
          roundInterval: 30000,
        },
      },
      null,
  );
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
