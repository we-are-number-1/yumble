/**
 * Function for when restaurants are updated.
 * @param {*} socket
 * @param {*} cb call back function
 */
export function updateRestaurants(socket, cb) {
  socket.on('update_restaurants', (restaurants) => {
    cb(restaurants);
  });
}
