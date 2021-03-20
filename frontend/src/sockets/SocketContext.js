import React, {useState} from 'react';
import {io} from 'socket.io-client';

const SocketContext = React.createContext();

/**
 * @param {*} param0
 * @return {*} SocketContext Provider
 */
function SocketContextProvider({children}) {
  const [socket, setSocket] = useState(io());
  const [countdown, setCountdown] = useState(null);
  const [users, setUsers] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [code, setCode] = useState(null);

  const context = {
    socket,
    setSocket,
    countdown,
    setCountdown,
    users,
    setUsers,
    preferences,
    setPreferences,
    code,
    setCode,
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  );
}

export {SocketContext, SocketContextProvider};
