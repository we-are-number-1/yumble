import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import UserInput from '../Common/UserInput';
import style from './Preferences.module.css';

/**
 *
 * @return {*}
 */
function Preferences() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <h1 className={style.largeMargin}>Select your Preferences</h1>
        <div className={style.smallMargin}>
          <UserInput
            input
            type='text'
            inputType='preferences'
            placeholder='Enter your location'
            fontSize={3}
          ></UserInput>
        </div>
        <Link to="/Lobby">
          <button className="GoButton">Go</button>
        </Link>

        <button className='GoButton'>Go</button>
        <Link to='/'>
          <button className='SmallBtn' id='BackButton'>
            Back
          </button>
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
            If you are visiting this page, you are likely here because you are
            searching for a random sentence. Sometimes a random word just is not
            enough, and that is where the random sentence generator comes into
            play. By inputting the desired number, you can make a list of as
            many random sentences as you want or need. Producing random
            sentences can be helpful in a number of different ways.
          </p>
        </Help>
      </div>
    </>
  );
}

export default Preferences;
