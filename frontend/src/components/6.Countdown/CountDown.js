import {Link, useHistory} from 'react-router-dom';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';

const CountDown = () => {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [seconds, setSeconds] = React.useState(3);
  // const [showResults, setShowResults] = React.useState(false);
  // const onClickNoShow = () => setShowResults(false);

  React.useEffect(() => {
    if (seconds >= 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  });

  const history = useHistory();
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
          {seconds == 0 ? <div className='StartTitle'>Go!</div>:
          <div className='StartTitle'>{seconds}</div>}
        </div>
      </div>
      <Link to='/Lobby'>
        <button className='SmallBtn' id='BackButton'>
          Back
        </button>{' '}
      </Link>
      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          This is the countdown, please wait for the timer and you be set for
          your date!
        </p>
      </Help>
      {seconds == -1 ? goNextPge() : null}
    </>
  );
};

export default CountDown;
