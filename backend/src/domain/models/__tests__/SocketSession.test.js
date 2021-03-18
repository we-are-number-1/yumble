import {SocketSession} from '../SocketSession';

const session = new SocketSession('1234', null, {roundInterval: 3});
const socket = {id: '1000'};

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

test('remove user to socket session', () => {
  expect(session.users.size).toBe(1);
  session.removeUser(socket);
  expect(session.users.size).toBe(0);
});
