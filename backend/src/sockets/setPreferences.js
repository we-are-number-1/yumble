/**
 * Handles sending of preference update (as object) to users based on session ID
 * @param {*} socket
 * @param {*} io
 */
export function updatePreference(socket, io) {
<<<<<<< HEAD
  socket.on('set_preferences', ({sessionId, preferences}) => {
    io.to(sessionId).emit('set_preferences', preferences);
=======
  socket.on('set_preferences', ({sessionID, preferences}) => {
    io.to(sessionID).emit('set_preferences', preferences);
>>>>>>> Added preference setting related websockets to frontend and backend
  });
}
