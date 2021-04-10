import './App.css';
import StartPage from './components/1.Landing/StartPage';
import JoinGroup from './components/2.Join/JoinGroup';
import Preferences from './components/3.Preferences/Preferences';
import Lobby from './components/4.Lobby/Lobby';
import 'bootstrap/dist/css/bootstrap.min.css';
import Countdown from './components/5.Countdown/CountDown';
import Swiping from './components/6.Swiping/SwipingPage';
import Result from './components/7.Result/ResultPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Switch,
  Route,
  Redirect,
  MemoryRouter,
} from 'react-router-dom';

/**
 *
 * @return {*}
 */
function App() {
  return (
    <MemoryRouter>
      <div className='BackGroundImage'>
        <Switch>
          <Route path='/' exact component={StartPage} />
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
    </MemoryRouter>
  );
}

export default App;
