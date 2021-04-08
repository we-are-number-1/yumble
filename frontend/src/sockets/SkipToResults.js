/**
 * Function for when skip event received
 * @param {*} socket
 * @param {*} cb call back function
 */
export function skipToResults(socket, cb) {
  socket.on('skip-to-results', (data) => {
    cb(data);
  });
}
