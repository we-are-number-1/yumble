
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
        sessionId: sessionId,
        addUser: function( socket, name) {},
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
}

export default new Games();
