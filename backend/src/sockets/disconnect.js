import games from '../domain/Games';
/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 * @param {*} io
 * @param {*} cb callback function
 */
export function disconnect(socket, io, cb) {
  socket.on('disconnect', () => {
    // const socketId = socket.id;
    const activeGames = games.getGames();

    activeGames.forEach((game) => {
      if (game.session.removeUser(socket)) {
        const users = Array.from(
            game.session.users.values()).map((e) => e.name);
        console.log(users);
        io.to(game.session.sessionId).emit('new_user', {users: users});
      }
    });
    console.log('user disconnected with id:', socket.id);
    cb();
  });
}
