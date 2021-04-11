import games from '../domain/Games';
/**
 * Handles event when user joins a room. Adds to corresponding roomid.
 * @param {*} socket
 * @param {*} io
 */
export function joinRoom(socket, io) {
  socket.on('join_room', ({sessionId, name}) => {
    const game = games.getGame(sessionId);
    if (!game || game.session.users.size >= 10) {
      io.to(socket.id).emit('invalid_code', true);
      console.log('Invalid game code: ' + sessionId);
      return;
    }
    io.to(socket.id).emit('invalid_code', false);

    game.session.addUser(socket, name);
    socket.join(sessionId);
    const users = Array.from(game.session.users.values()).map((e) => e.name);
    console.log(users);

    io.to(sessionId).emit('new_user', {users: users});
    if (game.session.restaurants) {
      console.log(`restaurants sent to ${name}`);
      io.to(sessionId).emit('update_restaurants', game.session.restaurants);
    }
  });
}
