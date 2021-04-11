const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');
import games from '../../domain/Games';

import * as SocketEvent from '../index';

jest.mock('../../domain/models/Game.js');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;
let socketServer;

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

test('start integration test', (done) => {
  games.newGame(null, {sessionId: '1234'}, null);
  const mock = jest.fn();
  mock.mockImplementation(() => {
    done();
  });
  SocketEvent.start(socketServer, mock);
  socket.emit('start', {sessionId: '1234'});
});


