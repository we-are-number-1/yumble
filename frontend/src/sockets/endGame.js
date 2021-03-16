/**
 * Function for when the game ends.
 * @param {*} socket
 * @param {*} cb call back function
 */
export function endGame(socket, cb) {
  socket.on('end_game', () => {
    socket.disconnect(true);
    cb();
  });
}
