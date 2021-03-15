import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';

const UserInput = styled.input`
  outline: none;
  width: 20vw;
  border-radius: 30px;
  border: 4px solid #000000;
  font-size: 4vw;
  margin: 1vw;
`;

/**
 *
 * @return {*}
 */
function GroupCode() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <h1 className="Title">yumble</h1>
      <div className="MakeCentre">
        <div className="GroupCode_Box">
          Enter group code
          <div>
            <UserInput
              input
              type="text"
              placeholder="e.g P6aPE"
              fontSize={3}
            ></UserInput>
          </div>
          <Link to="Preferences">
            <button className="GoButton">Go</button>
          </Link>
        </div>
      </div>
      <Link to="/">
        <button className="BackButton">Back</button>
      </Link>

      <button onClick={() => setButtonPopup(true)} className="HelpButton">
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
