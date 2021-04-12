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

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.address();
  ioServer = ioBack(httpServer);

  ioServer.on('connection', (serverSocket) => {
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

test('socket disconnect test', (done) => {
  const mock = jest.fn();
  mock.mockImplementation(() => {
    done();
  });
  SocketEvent.disconnect(socket, ioServer, mock);
  socket.close();
});

test('test if disconnect then remove user ', (done) => {
  const session = new SocketSession('123', '1234', {roundInterval: 3}, null);
  session.addUser(socket, 'sky');
  games.newGame(null, session, null);

  const mock = jest.fn();
  mock.mockImplementation(() => {
    done();
  });

  socket.on('new_user', ({users}) => {
    expect(users).toEqual({users: []});
  });

  SocketEvent.disconnect(socket, ioServer, mock);
  socket.close();
});
