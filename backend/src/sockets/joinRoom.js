import {io} from '../index';
/**
 * Handles event when user joins a room. Adds to corresponding roomid.
 * @param {*} socket
 */
export function joinRoom(socket) {
  socket.on('join_room', ({roomid, username}) => {
    // Join room
    // io.to(roomid).emit('new_user', );
  });
}
