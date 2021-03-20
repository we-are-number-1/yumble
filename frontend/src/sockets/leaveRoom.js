/**
 * Emits a leave room event to backend sockets
 * @param {*} socket
 */
export function leaveRoom(socket) {
  socket.emit('leave_room');
}
