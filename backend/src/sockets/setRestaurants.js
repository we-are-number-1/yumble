import games from '../domain/Games';

/**
 * Handles sending of preference update (as object) to users based on session ID
 * @param {*} socket
 * @param {*} io
 */
export function setRestaurants(socket) {
  socket.on('set_restaurants', ({sessionId, restaurants}) => {
    games.getGame(sessionId).session.restaurants = restaurants;
    console.log(restaurants.length);
    games.getGame(sessionId).swipeDeck.length = restaurants.length;
  });
}
