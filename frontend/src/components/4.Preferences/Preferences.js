import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import UserInput from '../Common/UserInput';
// import styled from 'styled-components';

// const UserInput = styled.input`
//   outline: none;
//   width: 80vw;
//   border-radius: 20px;
//   border: 4px solid #000000;
//   font-size: 4vw;
//   margin: 1vw;
// `;

/**
 *
 * @return {*}
 */
function Preferences() {
  const [ButtonPopup, setButtonPopup] = useState(false);

  return (
    <>
      <h1 className="Title">yumble</h1>
      <div className="MakeCentre">
        <h1 className="Title" style={{marginBottom: '35%'}}>
          Select your Preferences
        </h1>
        <div style={{marginBottom: '20%'}}>
          {/* <input className={style.input} placeholder="e.g P6aPE"
              fontSize={3} type="text"></input> */}
          <UserInput
            input
            type="text"
            placeholder="Enter your location"
            fontSize={3}
          ></UserInput>
        </div>

        <button className="GoButton" style={{}}>
          Go
        </button>
        <Link to="/">
          <button className="BackButton">Back</button>
        </Link>

        <button onClick={() => setButtonPopup(true)} className="HelpButton">
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
