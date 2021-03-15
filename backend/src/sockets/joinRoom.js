import games from '../domain/Games';
/**
 * Handles event when user joins a room. Adds to corresponding roomid.
 * @param {*} socket
 * @param {*} io
 */
export function joinRoom(socket, io) {
  socket.on('join_room', ({gameid, name}) => {
    const game = games.getGame(gameid);
    if (!game.session.host) {
      game.session.host = socket;
    }
    game.session.addUser(socket, name);
    io.to(roomid).emit('new_user', {users: game.session.users});
  });
}
