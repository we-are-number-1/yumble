/**
 * Function for when a new user joins a room.
 * @param {*} socket
 * @param {*} cb call back function
 */
export function newUser(socket, cb) {
  socket.on('new_user', (data) => {
    // Call back function with input users.
    cb(data);
  });
}
