import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
// import styled from 'styled-components';

/**
 *
 * @return {*}
 */
function makeid() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 *
 * @return {*}
 */
function CreateGroup() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <h1 className="Title">yumble</h1>
      <div className="MakeCentre">
        <div className="GroupCode_Box">
          Your group code is...
          <div style={{padding: '1vw'}}>{makeid()}</div>
          <Link to="Preferences">
            <button className="GoButton">Go</button>
          </Link>
        </div>
      </div>{' '}
      <Link to="/">
        <button className="BackButton">Back</button>
      </Link>
      <button onClick={() => setButtonPopup(true)} className="HelpButton">
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          Please copy this group code and send it to the user for them to join
          the room.
        </p>
      </Help>
    </>
  );
}

export default CreateGroup;
