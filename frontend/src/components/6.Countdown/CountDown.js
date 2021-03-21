import {useHistory} from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import {SocketContext} from './../../sockets/SocketContext';
import * as SocketEvents from './../../sockets';
import '../Common/Help.css';

const CountDown = () => {
  const history = useHistory();
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [seconds, setSeconds] = useState(socketContext.countdown);

  useEffect(() => {
    document.title = 'Go!';
    SocketEvents.nextRound(socketContext.socket, goNextPge);
    console.log(socketContext.countdown);
  }, []);

  useEffect(() => {
    seconds >= 0 ? setTimeout(() => setSeconds(seconds - 1), 1000) : null;
  }, [seconds]);


  /**
   */
  const goNextPge = () => {
    history.push('/Swiping');
  };


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
      {seconds == -1 ? goNextPge() : null}
    </>
  );
};

export default CountDown;
