import {Game} from './models/Game';

/**
  * This class stores a list of all active games in session
  */
export class Games {
  /**
    * Initiates map storing all game sessions
    */
  constructor() {
    this.activeGames = new Map();
  }

  /**
    * @return {activeGames} returns map of all active games
    */
  getGames() {
    return activeGames;
  }

  /**
    *
    * @param {*} id
    * @return {*} game for give id
    */
  getGame(id) {
    return this.activeGames[id];
  }

  /**
    * @param {*} io, server io socket connection
    * @param {*} session, session for game to be played
    * @param {*} swipeDeck, list of restaurants
    */
  newGame(io, session, swipeDeck) {
    this.activeGames.set(session.sessionId, new Game(
        io,
        session,
        swipeDeck,
    ));
  }

  /**
   * @param {*} gameid
   */
  removeGame(gameid) {
    this.activeGames.delete(gameid);
  }
}

export default new Games();
