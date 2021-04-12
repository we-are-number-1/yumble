import Games from '../Games';

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
    this.countdown = 4;
    this.gameActive = false;
  }

  /**
   * Handles countdown from 3 before game start
   * Note: emits 3, 2, 1, 0.
   * 0 represents the start of the game (calling nextRound)
   */
  async startCountdown() {
    this.gameActive = true;
    // Let all users in game start countdown
    this.io.to(this.session.sessionId).emit(
        'countdown', {
          count: this.countdown,
        });

    for (let i=0; i < this.countdown; i++) {
      console.log(i);
      await this.sleep(1000);
    }

    this.nextRound();
  }

  /**
   * Sleep function
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


    for (let i=1; i < this.swipeDeck.length; i++) {
      // Notifies users of round change
      this.io.to(this.session.sessionId).emit(
          'next_round',
          {
            nextRoundTime: this.roundInterval,
            currentRound: this.round,
          },
      );
      console.log(i * this.roundInterval);
      await this.sleep(this.roundInterval);
    }

    this.endGame();
  }

  /**
   * This emits an end_game event to all users in the session
   */
  async endGame() {
    // Delay to let db sync, then tell users game has ended
    await this.sleep(500);
    this.session.syncDb();
    await this.sleep(200);
    this.io.to(this.session.sessionId).emit('end_game');
    // Remove game from active games list
    Games.removeGame(this.session.sessionId);
    console.log('removed game:', this.session.sessionId);
  }
}
