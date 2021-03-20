import React, {useEffect, useContext} from 'react';
import './App.css';
import StartPage from './components/1.Landing/StartPage';
import CreateGroup from './components/3.CreateGroup/CreateGroup';
import JoinGroup from './components/2.Join/JoinGroup';
import Preferences from './components/4.Preferences/Preferences';
import Lobby from './components/5.Lobby/Lobby';
import Countdown from './components/6.Countdown/CountDown';
import Swiping from './components/7.Swiping/SwipingPage';
import Result from './components/8.Result/ResultPage';
import {SocketContext} from './sockets/SocketContext';
import * as SocketEvents from './sockets';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

/**
 *
 * @return {*}
 */
function App() {
  const socketContext = useContext(SocketContext);
  const socket = socketContext.socket;
  useEffect(() => {
    SocketEvents.endGame(socket, (data) => {
    });
    SocketEvents.newUser(socket, (data) => {
      console.log(data);
      socketContext.setUsers(data.users);
    });
    SocketEvents.nextRound(socket, (data) => {
    });
    SocketEvents.setPreferences(socket, (preferences) => {
      socketContext.setPreferences(preferences);
    });
  }, []);

  return (
    <Router>
      <div className='BackGroundImage'>
        <Switch>
          <Route path='/' exact component={StartPage} />
          {/* createGroup should be removed */}
          <Route path='/CreateGroup' component={CreateGroup} />
          <Route path='/JoinGroup' component={JoinGroup} />
          <Route path='/Preferences' component={Preferences} />
          <Route path='/Lobby/:id' component={Lobby} />
          <Route path='/Countdown' component={Countdown} />
          <Route path='/Swiping' component={Swiping} />
          <Route path='/Result' component={Result} />
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
