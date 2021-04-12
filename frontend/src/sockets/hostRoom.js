/**
 * Emits a host_room even to backend sockets
 * @param {*} socket
 * @param {*} sessionId
 */
export function hostRoom(socket, sessionId) {
  socket.emit('host_room', {sessionId});
}
