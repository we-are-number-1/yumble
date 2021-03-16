/**
 * Emits a join_room even to backend sockets
 * @param {*} socket
 * @param {*} gameId
 */
export function start(socket, gameId) {
  socket.emit('start', {gameId});
}
