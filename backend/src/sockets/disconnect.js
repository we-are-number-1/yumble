import games from '../domain/Games';
/**
 * Socket event for when a user disconnects.
 * @param {*} socket
 * @param {*} io
 * @param {*} cb callback function
 */
export function disconnect(socket, io, cb) {
  socket.on('disconnect', () => {
    const activeGames = games.getGames();

    activeGames.forEach((game) => {
      if (game.session.removeUser(socket)) {
        const users = Array.from(
            game.session.users.values()).map((e) => e.name);
        console.log(users);
        // Remove the game if the game hasnt started and no one is in the lobby
        // To prevent a memory leak
        if(users.length==0 && game.gameActive==false){
          games.removeGame(game.session.sessionId);
        }else{
          io.to(game.session.sessionId).emit('new_user', {users: users});
        }
      }
    });
    console.log('user disconnected with id:', socket.id);
    cb();
  });
}
