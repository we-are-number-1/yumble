import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import UserInput from '../Common/UserInput';

/**
 *
 * @return {*}
 */
function GroupCode() {
  useEffect(() => {
    document.title = 'Enter group code';
  }, []);
  const [ButtonPopup, setButtonPopup] = useState(false);
  // use state to store code
  // unsure if we can pass the code using the routing method we hav
  // const [code, setCode] = useState(undefined);
  const [code, setCode] = useState('temp');
  const [name, setName] = useState('Alex');

  // TODO needs to be used
  // just to 'use' the variable for now
  console.log(name);

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div className='Join_input'>
          <div className='Username_Box'>
            Enter Name
            <div>
              <UserInput
                input
                type='text'
                inputType='joinGroup' // what is inputType
                placeholder='e.g Alex'
                fontSize={3}
                // on change currently doesnt work
                onChange={(e) => setName(e.target.value)}
              ></UserInput>
            </div>
          </div>
          <div className='GroupCode_Box'>
            Enter group code
            <div>
              <UserInput
                input
                type='text'
                inputType='joinGroup'
                placeholder='e.g P6aPE'
                fontSize={3}
                // on change currently doesnt work
                onChange={(e) => setCode(e.target.value)}
              ></UserInput>
            </div>
            <Link to={'Lobby/' + code}>
              {/* need to change to check or whatnot */}
              <button onClick={() => console.log(code)} className='GoButton'>
                Go
              </button>
              {/* need to check if this code inputted is correct */}
            </Link>
          </div>
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
