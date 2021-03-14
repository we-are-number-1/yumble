/**
 * Functino for when a new user joins a room.
 * @param {*} socket
 * @param {*} cb call back function
 */
export function newUser(socket, cb) {
  socket.on('new_user', (username) => {
    // Set users of lobby.
    cb(username);
  });
}
