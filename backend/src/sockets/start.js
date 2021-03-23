import games from '../domain/Games';

/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 */
export function start(socket) {
  socket.on('start', ({sessionId, length}) => {
    const game = games.getGame(sessionId);
    // game.swipeDeck.length = length;
    game.startCountdown();
  });
}
