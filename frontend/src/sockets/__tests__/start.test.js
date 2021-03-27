const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

import * as SocketEvent from '../index';

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

let serverSocket;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.address();
  ioServer = ioBack(httpServer);

  ioServer.on('connection', (ioServerSocket) => {
    serverSocket = ioServerSocket;
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

test('start test', (done) => {
  serverSocket.on('start', () => {
    done();
  });
  SocketEvent.start(socket, '1234');
});
