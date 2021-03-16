/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 */
export function disconnect(socket) {
  socket.on('disconnect', () => {
    console.log('user disconnected with id:', socket.id);
  });
}
