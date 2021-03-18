import games from '../Games';
import {SocketSession} from '../models/SocketSession';

test('add game', () => {
  const session = new SocketSession('1234', null, {roundInterval: 3});
  games.newGame(null, session, null);
  expect(games.getGame('1234')).toBeDefined();
});

test('game is persisted', () => {
  expect(games.getGame('1234')).toBeDefined();
});

test('get all active games', () => {
  expect([...games.getGames().keys()]).toEqual(['1234']);
});

test('remove game', () => {
  games.removeGame('1234');
  expect(games.getGame('1234')).not.toBeDefined();
});

test('get all active games', () => {
  expect([...games.getGames().keys()]).toEqual([]);
});
