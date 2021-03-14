import logo from './logo.svg';
import './App.css';
import * as Sockets from './sockets';
import {useEffect} from 'react';

/**
 * Main entry point for the application
 * @return {Object} React component
*/
function App() {
  useEffect(() => {
    const socket = Sockets.getSocketClient();
    socket.emit('join_room', {roomid: 'test', username: 'test2'});
    Sockets.newUser(socket);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
