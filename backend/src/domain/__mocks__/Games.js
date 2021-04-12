import {Game} from '../models/Game';

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
    *
    * @param {*} sessionId
    * @return {*} game for give id
    */
  getGame(sessionId) {
    return {
      session: {
        users: new Map(),
        votes: new Map(),
        sessionId: sessionId,
        addUser: function( socket, name) {},
        addVote: jest.fn(),
      },
      startCountdown: function() { },
    };
  }

  /**
   * @return {*}
   */
  getGames() {
    return new Map();
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
}

export default new Games();
