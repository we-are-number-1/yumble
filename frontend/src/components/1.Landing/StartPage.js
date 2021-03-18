import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Help from '../Common/Help';
import '../Common/Help.css';

/**
 *
 * @return {*}
 */
function StartPage() {
  useEffect(() => {
    document.title = 'Yumble: Find places to eat, fast';
  }, []);

  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <div className='MakeCentre'>
        <h1 className='StartTitle'>yumble</h1>

        <Link to='/CreateGroup'>
          <button className='BigBtn' id='CreateGroup_btn'>
            Create group
          </button>
        </Link>
        <Link to='/JoinGroup'>
          <button className='BigBtn' id='JoinGroup_btn'>
            Join group
          </button>
        </Link>
      </div>

      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          Press the [create group] to create a lobby. To join a group, press the
          [join group] to join a group
        </p>
      </Help>
    </>
  );
}

export default StartPage;
