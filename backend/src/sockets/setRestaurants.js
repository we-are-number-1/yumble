import games from '../domain/Games';

/**
 * Handles sending of preference update (as object) to users based on session ID
 * @param {*} socket
 * @param {*} cb
 */
export function setRestaurants(socket, cb = null) {
  socket.on('set_restaurants', ({sessionId, restaurants}) => {
    if (games?.getGame(sessionId)?.session) {
      games.getGame(sessionId).session.restaurants = restaurants;
      console.log(restaurants.length);
      if (games?.getGame(sessionId)?.swipeDeck?.length) {
        games.getGame(sessionId).swipeDeck.length = restaurants.length;
      }
    }
    if (cb) {
      cb();
    }
  });
}
