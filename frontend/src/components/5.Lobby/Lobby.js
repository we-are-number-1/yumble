import {Link} from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import {SocketContext} from './../../sockets/SocketContext';
import '../Common/Help.css';
import '../5.Lobby/Lobby.css';

const Lobby = () => {
  const socketContext = useContext(SocketContext);

  const [ShareButtonPopup, setSharePopup] = useState(false);
  const [helpButtonPopup, setHelpButtonPopup] = useState(false);
  const [users, setUsers] = useState(
    socketContext.users ? socketContext.users : []);

  useEffect(() => {
    setUsers(socketContext.users ? socketContext.users : []);
  }, [socketContext]);

  useEffect(() => {
    document.title = 'Waiting Room';
  }, []);

  {
    /* link this to backend.
  Backend just needs to push data into
  People array, NumOfCusines array and GroupCode*/
  }
  let GroupCode = '';
  GroupCode = 'HX8192';

  const People = [
    'Bob',
    'Alex',
    'John',
    'Banan',
    'meow',
    'woof',
    'mouse',
    'kik',
    'Chonk',
  ];
  People.push('meanie');

  const NumOfCusines = [];

  NumOfCusines.length == 0 ? NumOfCusines.push('Thai') : null;

  NumOfCusines.length > 0 ?
      (NumOfCusines.push(', ' + 'Burger'),
      NumOfCusines.push(', ' + 'European'),
      NumOfCusines.push(', ' + 'Mediterranean'),
      NumOfCusines.push(', ' + 'Chinese')) : null;

  const peopleList = () => {
    const peopleArray = [];
    const Food = 'Food';

    for (let i = 0; i < users.length; i++) {
      const FoodID = Food.concat(i.toString());
      peopleArray.push(
          <div className={FoodID} id='FoodIcon' key={i.toString()}>
            <text className='FoodIconText'>{users[i]}</text>
          </div>,
      );
    }
    return peopleArray;
  };

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div className='CusineTitle'>Cusines: {NumOfCusines}</div>
        <div className={'LobbyBox'}>
          <div>
            <div className='Inline_Block'>Group code: {GroupCode}</div>
            <span className='CentreTitle'></span>
            <div className='Inline_Block'>{users.length}/10</div>
          </div>
          <div id='container'>{peopleList()}</div>
        </div>
        <Link to='/CountDown'>
          <button className='GoButton'>Go</button>
        </Link>
        <button onClick={() => setSharePopup(true)} className='ShareButton'>
          Share
        </button>
        <Help trigger={ShareButtonPopup} setTrigger={setSharePopup}>
          <div className='MakeTextCentre'>
            <h2> Please share this link:</h2>{' '}
            <a href={'https://yumble.xyz/Lobby/' + GroupCode}>
            https://yumble.xyz/Lobby/{GroupCode}
            </a>
          </div>
        </Help>
        <Link to='/Preferences'>
          <button className='SmallBtn' id='BackButton'>
            Back
          </button>
        </Link>
        <button
          onClick={() => setHelpButtonPopup(true)}
          className='SmallBtn'
          id='HelpButton'
        >
          help?
        </button>

        <Help trigger={helpButtonPopup} setTrigger={setHelpButtonPopup}>
          <p className='MakeTextCentre'>
            This is the lobby room, please wait a moment for the lobby to be
            filled.
          </p>
        </Help>
      </div>
    </>
  );
};

export default Lobby;
