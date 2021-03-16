import {io} from 'socket.io-client';

let socket = null;

/**
 * Get the socket client. Creates the socket if it has not been initialized.
 * @return {*}
 */
export function getSocketClient() {
  if (!socket) {
    socket = io();
  }
  return socket;
}
