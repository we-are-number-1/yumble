import express from 'express';
import http from 'http';
import path from 'path';
import socketio from 'socket.io';
import mongoose from 'mongoose';
import * as SocketEvents from './sockets';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('dotenv').config();

const mongoUri = process.env.ATLAS_URI;
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Successfully connected to MongoDB Atlas.`);
      }
    },
);

const PORT = process.env.PORT || 3001;

app.use(express.json());

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

app.get('/api', (req, res) => {
  res.send('Hello World');
});

if (process.env.NODE_ENV == 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

io.on('connection', (socket) => {
  console.log('a user connected with id:', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected with id:', socket.id);
  });
  SocketEvents.joinRoom(socket);
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
