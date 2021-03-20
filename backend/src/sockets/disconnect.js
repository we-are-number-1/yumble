import games from '../domain/Games';
/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 * @param {*} cb callback function
 */
export function disconnect(socket, cb) {
  socket.on('disconnect', () => {
    const socketId = socket.id;
    const activeGames = games.getGames();
    // let sessionId = null;
    // activeGames.forEach((game) => {
    //   game?.session?.users?.filter((userId) => userId != socketId);
    //   if (game?.session?.users?.size == 0) {
    //     sessionId = game.session.sessionId;
    //   }
    // });
    // if (sessionId) {
    //   games.removeGame(sessionId);
    // }
    console.log('user disconnected with id:', socket.id);
    cb();
  });
}
