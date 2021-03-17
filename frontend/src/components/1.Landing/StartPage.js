import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../Common/Help.css';
import MapModal from '../Map/MapModal';

/**
 *
 * @return {*}
 */
function StartPage() {
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
      <MapModal trigger={ButtonPopup} setTrigger={setButtonPopup} />
    </>
  );
}

export default StartPage;
