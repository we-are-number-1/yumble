import games from '../domain/Games';
/**
 * Handles event when user joins a room. Adds to corresponding roomid.
 * @param {*} socket
 * @param {*} io
 */
export function joinRoom(socket, io) {
  socket.on('join_room', ({sessionId, name}) => {
    const game = games.getGame(sessionId);
    if (!game.session.hostSocket) {
      game.session.hostSocket = socket;
    }
    game.session.addUser(socket, name);
    socket.join(sessionId);
    io.to(sessionId).emit('new_user', {users: game.session.users});
  });
}
