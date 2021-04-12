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

test('test if remove user work correctly if leave room', (done) => {
  const session = new SocketSession('123', '1234', {roundInterval: 3}, null);
  session.addUser(socketServer, 'sky');
  games.newGame(null, session, null);

  const mock = jest.fn();
  mock.mockImplementation(() => {
    expect(games.getGame('123').session.users.size).toBe(0);
    done();
  });

  socket.on('new_user', ({users}) => {
    expect(users).toEqual({users: []});
  });

  SocketEvent.leaveRoom(socketServer, ioServer, mock);
  socket.emit('leave_room');
});

