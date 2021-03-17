/**
 * Function for when the game ends.
 * @param {*} socket
 * @param {*} cb call back function
 */
export function endGame(socket, cb) {
  socket.on('end_game', (data) => {
    socket.disconnect(true);
    cb(data);
  });
}
