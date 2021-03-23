import games from '../domain/Games';
/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 * @param {*} io
 * @param {*} cb callback function
 */
export function leaveRoom(socket, io, cb) {
  socket.on('leave_room', () => {
    const activeGames = games.getGames();
    activeGames.forEach((game) => {
      if (game.session.removeUser(socket)) {
        const users = Array.from(
            game.session.users.values()).map((e) => e.name);
        console.log(users);
        io.to(game.session.sessionId).emit('new_user', {users: users});
      }
    });
    console.log('user left room with id:', socket.id);
    cb();
  });
}
