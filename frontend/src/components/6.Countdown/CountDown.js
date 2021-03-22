import {Redirect} from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import {SocketContext} from './../../sockets/SocketContext';
import * as SocketEvents from './../../sockets';
import '../Common/Help.css';

const CountDown = (props) => {
  // const history = useHistory();
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [seconds, setSeconds] = useState(socketContext.countdown);
  const [data] = useState(props.location.state);
  const [redirect, setRedirect] = useState(false);

  /**
   *
   * @param {*} data
   */
  function cb(data) {
    setRedirect(true);
    socketContext.setCountdown(data.nextRoundTime);
  };

  useEffect(() => {
    document.title = 'Go!';
    SocketEvents.nextRound(socketContext.socket, cb);
    console.log(socketContext.countdown);
    console.log(props.location.state);
  }, []);

  useEffect(() => {
    seconds >= 0 ? setTimeout(() => setSeconds(seconds - 1), 1000) : null;
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
      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p className='MakeTextCentre'>
          Please wait for the timer!
        </p>
      </Help>
      {redirect ?
        <Redirect to={{pathname: '/Swiping',
          state: [data]}}
        /> : null}
      <div id="dummyMap" style={{visibility: 'hidden'}}></div>
    </>
  );
};

export default CountDown;
