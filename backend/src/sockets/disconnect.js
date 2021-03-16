import games from '../domain/Games';
/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 */
export function disconnect(socket) {
  socket.on('disconnect', () => {
    const socketid = socket.id;
    const activeGames = games.getGames();
    let removeGame = null;
    activeGames.forEach(([gameid, game]) => {
      game.session.users.filter((userid) => userid != socketid);
      if (game.session.users.size == 0) {
        removeGame = gameid;
      }
    });
    if (removeGame) {
      games.removeGame(removeGame);
    }
    console.log('user disconnected with id:', socket.id);
  });
}
