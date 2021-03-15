import React from 'react';
import './App.css';
import StartPage from './components/1.Landing/StartPage';
import CreateGroup from './components/3.CreateGroup/CreateGroup';
import JoinGroup from './components/2.Joining/JoinGroup';
import Preferences from './components/4.Preferences/Preferences';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

/**
 *
 * @return {*}
 */
function App() {
  return (
    <Router>
      <div className="BackGroundImage">
        <Switch>
          <Route path="/" exact component={StartPage} />
          <Route path="/CreateGroup" component={CreateGroup} />
          <Route path="/JoinGroup" component={JoinGroup} />
          <Route path="/Preferences" component={Preferences} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
