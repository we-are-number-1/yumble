/**
 * Listen for game_start socket event from frontend.
 * @param {*} socket
 */
export function gameStart(socket) {
  socket.on('game_start', ({gameid}) => {
    // TODO 3 Second Countdown timer
    // Then start game.
  });
}
