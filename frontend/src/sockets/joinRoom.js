/**
 * Emits a join_room even to backend sockets
 * @param {*} socket
 * @param {*} gameid
 * @param {*} name
 */
export function joinRoom(socket, gameid, name) {
  socket.emit('join_room', {gameid, name});
}
