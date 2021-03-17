/**
 * Function for when a new round starts.
 * @param {*} socket
 * @param {*} cb call back function
 */
export function nextRound(socket, cb) {
  socket.on('next_round', (data) => {
    // Call back function with next round data.
    cb(data);
  });
}
