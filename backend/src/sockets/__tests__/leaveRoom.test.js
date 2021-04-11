const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');
import games from '../../domain/Games';
import {SocketSession} from '../../domain/models/SocketSession';

import * as SocketEvent from '../index';

let socket;
let httpServer;
let httpServerAddr;
let ioServer;
let socketServer;

// jest.mock('../../domain/Games');

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.address();
  ioServer = ioBack(httpServer);

  ioServer.on('connection', (serverSocket) => {
    socketServer = serverSocket;
  });
  done();
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close();
  httpServer.close();
  done();
});

/**
 * Run before each test
 */
beforeEach((done) => {
  socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    'transports': ['websocket'],
  });

  socket.on('connect', () => {
    done();
  });
});

test('leave room test', (done) => {
  const mock = jest.fn();
  mock.mockImplementation(() => {
    done();
  });
  SocketEvent.leaveRoom(socketServer, ioServer, mock);
  socket.emit('leave_room');
});

test('leave room integration test', (done) => {
  games.newGame(null, new SocketSession('123', '1234', {roundInterval: 3}), null);

  socket.on('new_user', ({users}) => {
    console.log('test1:' + users);
    done();
  });

  const mock = jest.fn();
  mock.mockImplementation(() => {
    // No user added to test game
    //expect(games.getGame('123').session.users.size).toBe(1);
    games.getGame('123').session.removeUser(socket);
    expect(games.getGame('123').session.users.size).toBe(0);
    done();
  });
  SocketEvent.leaveRoom(socketServer, ioServer, mock);
  socket.emit('leave_room');
});

