import { Redirect } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import Help from '../Common/Help';
import { SocketContext } from './../../sockets/SocketContext';
import * as SocketEvents from './../../sockets';
import '../Common/Help.css';
import Button from 'react-bootstrap/Button';

/**
 * @param  {*} props
 * @return {*}
 *
 * Intermission screen to countdown before the game begins.
 * Counts down from 5.
 */
const CountDown = (props) => {
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [seconds, setSeconds] = useState(socketContext.countdown);
  const [data] = useState(props.location.state);
  const [redirect, setRedirect] = useState(false);

  /**
   * @param  {*} data
   *
   */
  function cb(data) {
    setRedirect(true);
    socketContext.setCountdown(data.nextRoundTime / 1000);
  }

  useEffect(() => {
    document.title = 'Go!';
    SocketEvents.nextRound(socketContext.socket, cb);
  }, []);

  useEffect(() => {
    let t = null;
    if (seconds >= 0) {
      t = setTimeout(() => setSeconds(seconds - 1), 1000);
    }

    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div>
          {seconds == 0 ? (
            <div className='StartTitle'>Go!</div>
          ) : (
            <div className='StartTitle'>{seconds}</div>
          )}
        </div>
      </div>
      <Button
        onClick={() => setButtonPopup(true)}
        variant='info'
        size='lg'
        id='HelpButton'
      >
        Help
      </Button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p className='MakeTextCentre'>Please wait for the timer!</p>
      </Help>
      {redirect ? (
        <Redirect to={{ pathname: '/Swiping', state: [data] }} />
      ) : null}
      <div id='dummyMap' style={{ visibility: 'hidden' }}></div>
    </>
  );
};

export default CountDown;
