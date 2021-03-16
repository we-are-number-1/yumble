import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import UserInput from '../Common/UserInput';

/**
 *
 * @return {*}
 */
function GroupCode() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div className='GroupCode_Box'>
          Enter group code
          <div>
            <UserInput
              input
              type='text'
              inputType='joinGroup'
              placeholder='e.g P6aPE'
              fontSize={3}
            ></UserInput>
          </div>
          <Link to='Preferences'>
            <button className='GoButton'>Go</button>
          </Link>
        </div>
      </div>
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
          Copy the group code from the person who created the lobby and paste it
          down here.
        </p>
      </Help>
    </>
  );
}

export default GroupCode;
