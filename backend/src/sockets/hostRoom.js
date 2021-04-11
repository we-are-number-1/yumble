import games from '../domain/Games';
/**
 * Handles event when hosts a room. should set the host socket property in
 * the room
 * @param {*} socket
 * @param {*} io
 */
export function hostRoom(socket, io) {
  socket.on('host_room', ({sessionId}) => {
    const game = games.getGame(sessionId);
    if (!game || game.session.users.size >= 10) {
      io.to(socket.id).emit('invalid_code', true);
      console.log('Invalid game code: ' + sessionId);
      return;
    }
    io.to(socket.id).emit('invalid_code', false);

    game.session.hostSocket = socket;
    socket.join(sessionId);
  });
}
