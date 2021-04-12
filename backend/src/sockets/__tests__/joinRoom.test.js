const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

import {SocketSession} from '../../domain/models/SocketSession';
import games from '../../domain/Games';
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
    SocketEvent.joinRoom(serverSocket, ioServer);
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

  games.activeGames = new Map();
});

test('join room successfully, join_room integration test', (done) => {
  games.newGame(null, new SocketSession('1234', '1234',
      {roundInterval: 3}), null);

  socket.on('invalid_code', (isInvalid) => {
    expect(isInvalid).toBe(false);
  });
  socket.on('new_user', ({users}) => {
    expect(users).toEqual(['bob']);
    done();
  });

  socket.emit('join_room', {sessionId: '1234', name: 'bob'});
});

test('join room that does not exist, join_room integration test', (done) => {
  socket.on('invalid_code', (isInvalid) => {
    expect(isInvalid).toBe(true);
    done();
  });
  socket.on('new_user', ({users}) => {
    done.fail(new Error('We should not update the users to other' +
    'players because user should not have joined the room.'));
  });

  socket.emit('join_room', {sessionId: '1234', name: 'bob'});
});

test('join room that is full, join_room integration test', (done) => {
  const session = new SocketSession('1234', '1234', {roundInterval: 3});

  // Session has 10 users - the maximum capacity
  session.addUser({id: '1000'}, '0');
  session.addUser({id: '1001'}, '1');
  session.addUser({id: '1002'}, '2');
  session.addUser({id: '1003'}, '3');
  session.addUser({id: '1004'}, '4');
  session.addUser({id: '1005'}, '5');
  session.addUser({id: '1006'}, '6');
  session.addUser({id: '1007'}, '7');
  session.addUser({id: '1008'}, '8');
  session.addUser({id: '1009'}, '9');

  games.newGame(null, session, null);

  socket.on('invalid_code', (isInvalid) => {
    expect(isInvalid).toBe(true);
    expect(games.getGame('1234').session.users.size).toBe(10);
    done();
  });
  socket.on('new_user', ({users}) => {
    done.fail(new Error('We should not update the users to other' +
    'players because user should not have joined the room.'));
  });

  socket.emit('join_room', {sessionId: '1234', name: 'bob'});
});
