import {useHistory} from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import {SocketContext} from './../../sockets/SocketContext';
import '../Common/Help.css';

const CountDown = () => {
  useEffect(() => {
    document.title = 'Go!';
  }, []);

  const [ButtonPopup, setButtonPopup] = useState(false);
  const [seconds, setSeconds] = React.useState(3);
  const history = useHistory();
  const socketContext = useContext(SocketContext);

  React.useEffect(() => {
    console.log(socketContext);
    seconds >= 0 ? setTimeout(() => setSeconds(seconds - 1), 1000) : null;
  });


  /**
   */
  function goNextPge() {
    history.push('/Result');
  }


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
