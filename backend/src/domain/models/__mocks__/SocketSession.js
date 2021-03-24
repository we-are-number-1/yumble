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
}
