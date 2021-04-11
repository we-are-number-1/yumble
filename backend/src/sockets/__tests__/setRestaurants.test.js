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

test('set_restaurants  integration test', (done) => {
  const session = new SocketSession('1234', null, [{}, {}]);
  games.newGame(null, session, []);

  const mock = jest.fn();
  mock.mockImplementation(() => {
    expect(games.getGame('1234').session.restaurants).toEqual([{}, {}]);
    expect(games.getGame('1234').swipeDeck.length).toEqual(0);
    done();
  });
  SocketEvent.setRestaurants(socketServer, mock);

  socket.emit('set_restaurants', {sessionId: '1234', restaurants: [{}, {}]});
});

