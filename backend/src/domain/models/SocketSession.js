import Session from '../../mongo/models/Session';

/**
 * This class is responsible for all information regarding a
 * single session or lobby
 */
export class SocketSession {
  /**
     * @param {*} sessionId, Unique identifier for a session
     * @param {*} hostSocket, socket for the host of the session
     * @param {*} preferences, preferences used to generate swipe deck and timer
     */
  constructor(sessionId, hostSocket, preferences) {
    this.sessionId = sessionId;
    this.hostSocket = hostSocket;
    this.preferences = preferences;
    this.users = new Map();
    this.votes = new Map();
  }

  /**
   * @param {*} socket, users socket connection
   * @param {*} name, users input nickname
   */
  addUser(socket, name) {
    this.users.set(socket.id, {socket: socket, name: name});
    console.log(`added user to game: ${this.sessionId}`);
  }

  /**
   * @param {*} socket, users socket connection
   * @return {*}
   */
  removeUser(socket) {
    console.log(`removed user from game: ${this.sessionId}`);
    return this.users.delete(socket.id);
  }

  /**
   * Add vote for given restaurant input
   * @param {*} restaurant
   */
  addVote(restaurant) {
    const data = this.votes.get(restaurant.name);
    if (data) {
      data.votes = data.votes + 1;
      this.votes.set(restaurant.name, data);
    } else {
      this.votes.set(
          restaurant.name,
          {votes: 1,
            location: restaurant.location,
            coords: restaurant.coords,
            price: restaurant.price,
            rating: restaurant.rating,
            images: restaurant.images},
      );
    }
  }

  /**
   * Syncs votes stored in memory to the database
   */
  async syncDb() {
    try {
      const session = await Session.findOne({truncCode: this.sessionId});
      const restaurants = [];
      this.votes.forEach((value, key, map) => {
        restaurants.push(
            {name: key,
              location: value.location,
              numberOfVotes: value.votes,
              coords: value.coords,
              price: value.price,
              rating: value.rating,
              images: value.images},
        );
      });
      session.results = restaurants;
      session.isFinished = true;
      session.save();
    } catch (error) {
      console.log(error);
    }
  }
}
