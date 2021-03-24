import {SocketSession} from '../SocketSession';

const session = new SocketSession('1234', null, {roundInterval: 3});
const socket = {id: '1000'};

jest.mock('../../../mongo/models/Session.js');

test('socket session instaniated correctly', () => {
  expect(session.sessionId).toBe('1234');
  expect(session.hostSocket).toBe(null);
  expect(session.preferences['roundInterval']).toBe(3);
  expect(session.users.size).toBe(0);
});

test('add user to socket session', () => {
  session.addUser(socket, 'Jim');
  expect(session.users.size).toBe(1);
  expect(session.users.get('1000')['name']).toBe('Jim');
});

test('remove user from socket session', () => {
  expect(session.users.size).toBe(1);
  session.removeUser(socket);
  expect(session.users.size).toBe(0);
});

test('add vote from socket session', () => {
  session.addVote({name: 'restaurant1', location: 'house'});
  expect(session.votes.size).toBe(1);
  session.addVote({name: 'restaurant1', location: 'house'});
  expect(session.votes.get('restaurant1').votes).toBe(2);
  session.addVote({name: 'restaurant2', location: 'house'});
  expect(session.votes.size).toBe(2);
});

test('save socket session to db', () => {
  session.syncDb();
});
