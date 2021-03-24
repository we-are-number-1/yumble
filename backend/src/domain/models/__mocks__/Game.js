
/**
 * Main game controller for the application.
 * Controls the timing of each round and state of the game
 */
export class Game {
  /**
       * @param {*} io, server io socket connection
       * @param {*} session, session for game to be played
       * @param {*} swipeDeck, list of restaurants
       */
  constructor(io, session, swipeDeck) {
    this.io = io;
    this.session = session;
    this.swipeDeck = swipeDeck;
  }

  /**
     * Handles countdown from 3 before game start
     * Note: emits 3, 2, 1, 0.
     * 0 represents the start of the game (calling nextRound)
     */
  async startCountdown() {
    jest.fn();
  }
}
