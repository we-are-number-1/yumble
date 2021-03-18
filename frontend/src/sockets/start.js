/**
 * Emits a join_room even to backend sockets
 * @param {*} socket
 * @param {*} sessionId
 */
export function start(socket, sessionId) {
  socket.emit('start', {sessionId});
}
