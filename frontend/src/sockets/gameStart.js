/**
 * Emits socket event to indicate start of a game.
 * @param {*} socket
 * @param {*} gameid
 */
export function gameStart(socket, gameid) {
  socket.emit('game_start', ({gameid}));
}
