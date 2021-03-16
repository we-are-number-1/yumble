/**
 * Function for when preferences are updated.
 * @param {*} socket
 * @param {*} cb call back function
 */
 export function setPreferences(socket, cb) {
    socket.on('set_preferences', (preferences) => {
<<<<<<< HEAD
      // Call back function with object containing updated preferences
=======
      // Call back function with next round data.
>>>>>>> Added preference setting related websockets to frontend and backend
      cb(preferences);
    });
  }
  