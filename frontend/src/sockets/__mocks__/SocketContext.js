import React, {useState} from 'react';

const SocketContext = React.createContext();

/**
   *
   */
function countdown() {
  jest.fn();
};

export {countdown};

/**
 * @param {*} param0
 * @return {*} SocketContext Provider
 */
function SocketContextProvider({children}) {
  const [socket, setSocket] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [users, setUsers] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [code, setCode] = useState(null);
  const [host, setHost] = useState(false);

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
    host,
    setHost,
  };

  return (
    <SocketContext.Provider value={context}>
      {children}
    </SocketContext.Provider>
  );
}

export {SocketContextProvider, SocketContext};
