import games from '../domain/Games';

/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 * @param {*} cb
 */
export function vote(socket, cb = null) {
  socket.on('vote', (sessionId, vote) => {
    games.getGame(sessionId).session.addVote(vote);
    if (cb) {
      cb();
    }
  });
}
