/**
 * Functino for when a new user joins a room.
 * @param {*} socket
 */
export function newUser(socket) {
  socket.on('new_user', ({username}) => {
    // Set users of lobby.
    console.log(username);
  });
}
