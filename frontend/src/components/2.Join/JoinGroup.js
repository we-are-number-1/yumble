import { Link, Redirect } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import Help from '../Common/Help';
import UserInput from '../Common/UserInput';
import '../2.Join/JoinGroup.css';
import * as SocketEvents from './../../sockets';
import { SocketContext } from './../../sockets/SocketContext';
import '../Common/Help.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/**
 *
 * @return {*}
 *
 * Screen for when a host user creates a new group.
 * This screen displays the group code that should be shared to others
 * to join the specific game.
 */
function GroupCode() {
  const socketContext = useContext(SocketContext);
  const [name, setName] = useState('Alex');
  const [invalidCode, setInvalidCode] = useState(true);
  const [skip, setSkip] = useState(false);
  const [ButtonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    document.title = 'Enter group code';
    SocketEvents.skipToResults(socketContext.socket, setSkip);
    SocketEvents.invalidCode(socketContext.socket, setInvalidCode);
  }, []);

  // TODO needs to be used
  // just to 'use' the variable for now
  // Includes the text areas to enter a group code, and input a name to play.
  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <Card id='Card-field'>
          <Card.Header as='h5' id='Card-Header'>
            Join Game
          </Card.Header>
          <Card.Body>
            <Card.Title>Enter Lobby Code</Card.Title>
            <Card.Text>
              <UserInput
                input
                type='text'
                inputType='joinGroup'
                placeholder='P6aPE'
                fontSize={3}
                onChange={(e) => socketContext.setCode(e.target.value)}
              ></UserInput>
            </Card.Text>
            <Card.Title>Enter Your Name</Card.Title>
            <Card.Text>
              <UserInput
                input
                type='text'
                inputType='joinGroup' // what is inputType
                placeholder='Alex'
                fontSize={3}
                // on change currently doesnt work
                onChange={(e) => setName(e.target.value)}
              ></UserInput>
            </Card.Text>
            <Button
              onClick={() => SocketEvents.joinRoom(socketContext.socket, socketContext.code, name)}
              className='GoButton'
            >
              Go
            </Button>
          </Card.Body>
        </Card>
        {!invalidCode && <Redirect to={`/Lobby/${socketContext.code}`} />}
        {skip && <Redirect to={'/Result'} />}
      </div>
      <Link to='/'>
        <Button variant='danger' size='lg' id='BackButton'>
          Back
        </Button>
      </Link>
      <Button onClick={() => setButtonPopup(true)} variant='info' size='lg' id='HelpButton'>
        Help
      </Button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          Copy the <mark>group code</mark> from the person who created the lobby and paste it down here.
        </p>
      </Help>
    </>
  );
}

export default GroupCode;
