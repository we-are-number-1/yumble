/**
 * Handles event when user joins a room. Adds to corresponding roomid.
 * @param {*} socket
 * @param {*} io
 */
export function joinRoom(socket, io) {
  socket.on('join_room', ({roomid, username}) => {
    // Join room
    socket.join(roomid);
    console.log(username);
    io.to(roomid).emit('new_user', {username});
  });
}
