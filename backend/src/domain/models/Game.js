
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
    this.roundInterval = session.preferences.roundInterval;
    this.round = 0;
  }

  /**
   * @param {*} callback, this function is called after the round interval
   *                      has passed
   */
  nextRound(callback) {
    this.round++;
    if (this.round === this.swipeDeck.length) {
      endGame();
      return;
    }

    this.io.to(this.session.sessionId).emit(
      'next_round',
      {
        nextRoundStartTime: Date.now() + this.roundInterval*1000,
        currentRound: round
      }
    );

    setTimeout(
        nextRound(),
        this.roundInterval*1000,
    );
  }

  /**
   * This disconnects the client side user from the lobby
   */
  endGame() {
    this.session.users.forEach((e) => {
      e.socket.disconnect(true);
    });
  }
}
