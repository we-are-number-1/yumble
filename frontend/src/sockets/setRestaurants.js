/**
 *
 * @param {*} socket
 * @param {*} sessionId
 * @param {*} restaurants
 */
export function setRestaurants(socket, sessionId, restaurants) {
  socket.emit('set_restaurants', {sessionId, restaurants});
}
