
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
    this.countdown = 3;
  }

  /**
   * Handles countdown from 3 before game start
   * Note: emits 3, 2, 1, 0.
   * 0 represents the start of the game (calling nextRound)
   */
  async startCountdown() {
    this.io.to(this.session.sessionId).emit(
        'countdown', {
          count: this.countdown,
        });

    for (let i=0; i <= this.countdown; i++) {
      console.log(i);
      await this.sleep(1000);
    }

    this.nextRound();
  }

  /**
   *
   * @param {*} ms
   * @return {*}
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Starts a new round with a timer, and emits a next_round event to all users
   * of the session
   */
  async nextRound() {
    this.round++;
    if (this.round === this.swipeDeck.length) {
      this.endGame();
      return;
    }

    this.io.to(this.session.sessionId).emit(
        'next_round',
        {
          nextRoundStartTime: Date.now() + this.roundInterval,
          currentRound: this.round,
        },
    );

    for (let i=0; i < this.swipeDeck.length; i++) {
      console.log(i * this.roundInterval);
      await this.sleep(this.roundInterval);
    }

    this.endGame();
  }

  /**
   * This emits an end_game event to all users in the session
   */
  endGame() {
    this.io.to(this.session.sessionId).emit('end_game');
  }
}
