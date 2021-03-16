import React from 'react';
import './App.css';
import StartPage from './components/1.Landing/StartPage';
import CreateGroup from './components/3.CreateGroup/CreateGroup';
import JoinGroup from './components/2.Join/JoinGroup';
import Preferences from './components/4.Preferences/Preferences';
import Lobby from './components/5.Lobby/LobbyPage';
import Countdown from './components/6.Countdown/CountdownPage';
import Swiping from './components/7.Swiping/SwipingPage';
import Result from './components/8.Result/ResultPage';
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
  return (
    <Router>
      <div className='BackGroundImage'>
        <Switch>
          <Route path='/' exact component={StartPage} />
          <Route path='/CreateGroup' component={CreateGroup} />
          <Route path='/JoinGroup' component={JoinGroup} />
          <Route path='/Preferences/:pin' component={Preferences} />
          <Route path='/Lobby' component={Lobby} />
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
