import games from '../domain/Games';

/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 * @param {*} cb
 */
export function start(socket, cb = null) {
  socket.on('start', ({sessionId}) => {
    const game = games.getGame(sessionId);
    game.startCountdown();
    if (cb) {
      cb();
    }
  });
}
