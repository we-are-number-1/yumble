/**
 * Function for processing game start countdown
 * @param {*} socket
 * @param {*} cb call back function
 */
export function countdown(socket, cb) {
  socket.on('countdown', (count) => {
    // Call back function with count data.
    cb(count);
  });
}
