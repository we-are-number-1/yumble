/**
 * Handles sending of preference update (as object) to users based on session ID
 * @param {*} socket
 * @param {*} io
 */
export function updatePreference(socket, io) {
  socket.on('set_preferences', ({sessionID, preferences}) => {
    io.to(sessionID).emit('set_preferences', preferences);
  });
}
