/**
 * Emits a leave room event to backend sockets
 * @param {*} socket
 * @param {*} sessionId
 * @param {*} vote
 */
export function vote(socket, sessionId, vote) {
  console.log(sessionId);
  socket.emit('vote', sessionId, vote);
}
