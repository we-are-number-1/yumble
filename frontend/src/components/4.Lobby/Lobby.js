import { useHistory, Redirect, Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import Help from '../Common/Help';
import { SocketContext } from '../../sockets/SocketContext';
import * as SocketEvents from '../../sockets';
import '../Common/Help.css';
import './Lobby.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/**
 * @param  {*} props
 * @return {*}
 *
 * The lobby screen of all players who have joined a specific game.
 * Each player will be shown, and a player can see all other players waiting
 * in the game room. Each player has an avatar.
 */
const Lobby = (props) => {
  const socketContext = useContext(SocketContext);
  const [ShareButtonPopup, setSharePopup] = useState(false);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [users, setUsers] = useState(
    socketContext.users ? socketContext.users : []
  );
  const [redirect, setRedirect] = useState(false);
  const [cardData, setCardData] = useState(props.location.state);

  useEffect(() => {
    setUsers(socketContext.users ? socketContext.users : []);
  }, [socketContext]);

  useEffect(() => {
    document.title = 'Waiting Room';
    SocketEvents.newUser(socketContext.socket, (data) => {
      socketContext.setUsers(data.users);
    });
    SocketEvents.updateRestaurants(socketContext.socket, (data) => {
      if (data) {
        setCardData(data);
      }
    });
    SocketEvents.countdown(socketContext.socket, (count) => {
      socketContext.setCountdown(count);
      startCountdown();
    });
    SocketEvents.nextRound(socketContext.socket, (data) => {
      socketContext.setTimer(data.nextRoundTime / 1000);
    });
  }, []);

  /**
   * Move to the countdown screen to start the game.
   */
  function startCountdown() {
    // go to next page
    setRedirect(true);
  }

  const history = useHistory();

  /**
   * Return to the previous page
   */
  const goBack = () => {
    SocketEvents.leaveRoom(socketContext.socket);
    history.goBack();
  };

  let NumOfUsers = 0;
  NumOfUsers = users.length;

  // generate the player lobby and give each player a avatar.
  const peopleList = () => {
    const peopleArray = [];

    // Pushing users data into lobby dynamically
    for (let i = 0; i < NumOfUsers; i++) {
      peopleArray.push(
        <Card key={i} className='cardMain'>
          <Card.Img
            variant='top'
            src={`avatars/${i}.png`}
            className='cardImage'
          />
          <Card.Body>
            <Card.Title>{users[i]}</Card.Title>
          </Card.Body>
        </Card>
      );
    }
    return peopleArray;
  };

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre' style={{ height: '100vh' }}>
        <div className={'LobbyBox'}>
          <div>
            <div className='Inline_Block'>Group code: {socketContext.code}</div>
            <span className='CentreTitle'></span>
            <div className='Inline_Block'>{NumOfUsers}/10</div>
          </div>
          <div id='container'>{peopleList()}</div>
        </div>
        {socketContext.host && (
          <button
            className='GoButton'
            onClick={() =>
              SocketEvents.start(socketContext.socket, socketContext.code)
            }
          >
            Go
          </button>
        )}
        {redirect && (
          <Redirect to={{ pathname: '/CountDown', state: cardData }} />
        )}
        <Button
          variant='success'
          onClick={() => setSharePopup(true)}
          className='ShareButton'
        >
          Share
        </Button>
        <Help
          trigger={ShareButtonPopup}
          setTrigger={setSharePopup}
          isShare={true}
        >
          <div className='MakeTextCentre'>
            <h1>
              <b>{socketContext.code}</b>
            </h1>
            <a href={'https://yumble.xyz'}>https://yumble.xyz</a>
          </div>
        </Help>
        <Link to='/'>
          <Button
            variant='danger'
            size='lg'
            id='BackButton'
            onClick={() => goBack()}
          >
            Back
          </Button>
        </Link>
        <Button
          onClick={() => setButtonPopup(true)}
          variant='info'
          size='lg'
          id='HelpButton'
        >
          Help
        </Button>

        <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
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
