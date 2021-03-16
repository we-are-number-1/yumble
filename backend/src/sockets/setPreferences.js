/**
 * Handles sending of preference update (as object) to users based on session ID
 * @param {*} socket
 * @param {*} io
 */
export function updatePreference(socket, io) {
  socket.on('set_preferences', ({sessionId, preferences}) => {
    io.to(sessionId).emit('set_preferences', preferences);
  });
}
