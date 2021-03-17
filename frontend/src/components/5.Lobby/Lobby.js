import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
// import UserInput from '../Common/UserInput';

// const Results = () => (
//   <div>
//     <UserInput
//       input
//       type="text"
//       inputType="preferences"
//       placeholder="Enter your timer"
//       fontSize={3}
//     ></UserInput>
//   </div>
// );

const Lobby = () => {
  const [ShareButtonPopup, setSharePopup] = useState(false);
  const [helpButtonPopup, setHelpButtonPopup] = useState(false);

  // const [showResults, setShowResults] = React.useState(false);
  // const onClickShow = () => setShowResults(true);
  // const onClickNoShow = () => setShowResults(false);

  const People = [
    'Bob',
    'Alex',
    'John',
    'Chow',
    'meow',
    'woof',
    'mouse',
    'kik',
    'Chonk',
    'meanie',
  ];

  let GroupCode = '';
  GroupCode = 'HX8192';

  const peopleList = () => {
    const peopleArray = [];
    const Food = 'Food';

    for (let i = 0; i < People.length; i++) {
      const output = Food.concat(i.toString());
      peopleArray.push(
          <div className={output} ID="FoodIcon">
            <text style=
              {{display: 'block', position: 'relative', top: '5.2vw'}}>
              {People[i]}
            </text>
          </div>);
    }
    return peopleArray;
  };

  return (
    <>
      <h1 className="Title">yumble</h1>
      <div className="MakeCentre">
        <div className={'LobbyBox'}>
          <div style={{display: 'inline'}}>
            <text>Group code: {GroupCode}</text>
            <text style={{position: 'absolute', right: '12vw'}}>
              {People.length}/10
            </text>
          </div>
          <div id="container">{peopleList()}</div>
        </div>
        <Link to="/CountDown">
          <button className="GoButton">Go</button>
        </Link>
        <div></div>
        <button onClick={() => setSharePopup(true)} className="ShareButton">
          Share
        </button>
        <Help trigger={ShareButtonPopup} setTrigger={setSharePopup}>
          <p> Please share this link: https://www.zomato.com/auckland</p>
        </Help>
        <Link to="Preferences">
          <button className="SmallBtn" id="BackButton">
            Back
          </button>
        </Link>
        <button
          onClick={() => setHelpButtonPopup(true)}
          className="SmallBtn"
          id="HelpButton"
        >
          help?
        </button>

        <Help trigger={helpButtonPopup} setTrigger={setHelpButtonPopup}>
          <p>
            This is the lobby room, please wait a moment before your date
            arrives
          </p>
        </Help>
        {/* <div>
          <button type="submit" value="Search" onClick={onClickShow}>
            Show
          </button>
          {showResults ? <Results /> : null}
        </div>
        <button onClick={onClickNoShow}>NoShow</button> */}
      </div>
    </>
  );
};

export default Lobby;
