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

jest.mock('../../domain/models/Game');

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

test('vote integration test', (done) => {
  games.newGame(null, new SocketSession('123', '1234', null), null);

  const mock = jest.fn();
  mock.mockImplementation(() => {
    expect(games.getGame('123').session.votes.get('restaurantName'))
        .toEqual({votes: 1, location: 'auckland'});
    done();
  });

  SocketEvent.vote(socketServer, mock);

  socket.emit('vote', '123', {name: 'restaurantName', location: 'auckland'});
});

