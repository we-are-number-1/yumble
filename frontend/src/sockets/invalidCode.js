/**
 * Function for when invalid game code is entered
 * @param {*} socket
 * @param {*} cb call back function
 */
export function invalidCode(socket, cb) {
  socket.on('invalid_code', (data) => {
    cb(data);
  });
}
