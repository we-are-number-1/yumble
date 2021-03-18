/**
 * Function for when preferences are updated.
 * @param {*} socket
 * @param {*} cb call back function
 */
export function setPreferences(socket, cb) {
  socket.on('set_preferences', (preferences) => {
    // Call back function with object containing updated preferences
    cb(preferences);
  });
}
