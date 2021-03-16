import games from '../domain/Games';
/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 */
export function disconnect(socket) {
  socket.on('disconnect', () => {
    const socketid = socket.id;
    const activeGames = games.getGames();
    activeGames.forEach(([gameid, game]) => {
      game.session.users.filter((userid) => userid != socketid);
      if (game.session.users.size == 0) {
        games.removeGame(gameid);
      }
    });
    console.log('user disconnected with id:', socket.id);
  });
}
