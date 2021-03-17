
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
   * Starts a new round with a timer, and emits a next_round event to all users
   * of the session
   */
  nextRound() {
    this.round++;
    if (this.round === this.swipeDeck.length) {
      endGame();
      return;
    }

    this.io.to(this.session.sessionId).emit(
        'next_round',
        {
          nextRoundStartTime: Date.now() + this.roundInterval*1000,
          currentRound: round,
        },
    );

    setTimeout(
        nextRound(),
        this.roundInterval*1000,
    );
  }

  /**
   * This emits an end_game event to all users in the session
   */
  endGame() {
    this.io.to(this.session.sessionId).emit('end_game');
  }
}
