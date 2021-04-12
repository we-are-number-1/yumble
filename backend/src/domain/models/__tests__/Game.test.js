import {Game} from '../Game';
import {SocketSession} from '../SocketSession';

const session = new SocketSession('1234', null, {roundInterval: 1});

const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

jest.mock('../../../mongo/models/Session.js');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;
let game;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.address();
  ioServer = ioBack(httpServer);

  ioServer.on('connection', (serverSocket) => {
    serverSocket.join('1234');
  });

  game = new Game(ioServer, session, {length: 3});
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


test('test game sequence', async (done) => {
  socket.on('end_game', () => {
    done();
  });
  game.startCountdown();
});
