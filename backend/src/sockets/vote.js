import games from '../domain/Games';

/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 */
export function vote(socket) {
  socket.on('vote', (sessionId, vote) => {
    console.log(sessionId);
    games.getGame(sessionId).session.addVote(vote);
  });
}
