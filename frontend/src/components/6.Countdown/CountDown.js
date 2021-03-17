import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';

const CountDown = () => {
  const [ButtonPopup, setButtonPopup] = useState(false);

  const [seconds, setSeconds] = React.useState(3);

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds('Go!');
    }
  });

  return (
    <>
      <h1 className="Title">yumble</h1>
      {/* This is to show how to change timer time */}
      {/* <button style={{marginTop: '10vw'}} onClick={() => setSeconds(10)}>
          Restart timer
      </button> */}
      <div className="MakeCentre">
        <div>
          <text className="StartTitle">{seconds}</text>
        </div>
      </div>

      <Link to="/Lobby">
        <button className="SmallBtn" id="BackButton">
          Back
        </button>{' '}
      </Link>
      <button
        onClick={() => setButtonPopup(true)}
        className="SmallBtn"
        id="HelpButton"
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          This is the countdown, please wait for the timer and you be set for
          your date!
        </p>
      </Help>
    </>
  );
};

export default CountDown;
