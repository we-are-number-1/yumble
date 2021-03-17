import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import '../5.Lobby/Lobby.css';

const Lobby = () => {
  const [ShareButtonPopup, setSharePopup] = useState(false);
  const [helpButtonPopup, setHelpButtonPopup] = useState(false);

  {/* link this to backend.
  Backend just needs to push data into People and NumOfCusines array */}
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
  ];
  People.push('meanie');

  const NumOfCusines = [
    'Thai, ',
    'Mediterranean, ',
    'Burger, ',
    'European',
  ];
  NumOfCusines.push(', ' + 'Chinese');


  let GroupCode = '';
  GroupCode = 'HX8192';

  const peopleList = () => {
    const peopleArray = [];
    const Food = 'Food';

    for (let i = 0; i < People.length; i++) {
      const FoodID = Food.concat(i.toString());
      peopleArray.push(
          <div className={FoodID} ID="FoodIcon">
            <text className="FoodIconText">
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
        <div className="CusineTitle">
          Cusines: {NumOfCusines}</div>
        <div className={'LobbyBox'}>
          <div>
            <text>Group code: {GroupCode}</text>
            <text className="PeopleCounterText">
              {People.length}/10
            </text>
          </div>
          <div id="container">{peopleList()}</div>
        </div>
        <Link to="/CountDown">
          <button className="GoButton">Go</button>
        </Link>
        <button onClick={() => setSharePopup(true)} className="ShareButton">
          Share
        </button>
        <Help trigger={ShareButtonPopup} setTrigger={setSharePopup}>
          <div style={{textAlign: 'center'}}>
            <h2> Please share this link:</h2> <a href="https://www.zomato.com/auckland">
              https://www.zomato.com/auckland</a>
          </div>
        </Help>
        <Link to="Preferences">
          <button className="SmallBtn" id="BackButton">
            Back
          </button>
        </Link>
        <button
          onClick={() => setHelpButtonPopup(true)}
          className="SmallBtn"
          id="HelpButton">
          help?
        </button>

        <Help trigger={helpButtonPopup} setTrigger={setHelpButtonPopup}>
          <p>
            This is the lobby room, please wait a moment before your date
            arrives
          </p>
        </Help>
      </div>
    </>
  );
};

export default Lobby;
