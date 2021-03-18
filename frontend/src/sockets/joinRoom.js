/**
 * Emits a join_room even to backend sockets
 * @param {*} socket
 * @param {*} sessionId
 * @param {*} name
 */
export function joinRoom(socket, sessionId, name) {
  socket.emit('join_room', {sessionId, name});
}
