import {Link} from 'react-router-dom';
import React, {useState, useEffect, useContext} from 'react';
import Help from '../Common/Help';
import UserInput from '../Common/UserInput';
import '../2.Join/JoinGroup.css';
import * as SocketEvents from './../../sockets';
import {SocketContext} from './../../sockets/SocketContext';
import '../Common/Help.css';

/**
 *
 * @return {*}
 */
function GroupCode() {
  const socketContext = useContext(SocketContext);
  // use state to store code
  // unsure if we can pass the code using the routing method we hav
  // const [code, setCode] = useState(undefined);
  const [code, setCode] = useState('temp');

  const [name, setName] = useState('Alex');
  const socket = socketContext.socket;

  useEffect(() => {
    document.title = 'Enter group code';
  }, []);
  const [ButtonPopup, setButtonPopup] = useState(false);

  // TODO needs to be used
  // just to 'use' the variable for now
  console.log(name);

  return (
    <>
      <h1 className='Title'>yumble</h1>
      <div className='MakeCentre'>
        <div className='Join_input'>
          <div className='AddMargin'>Enter group code</div>
          <div>
            <UserInput
              input
              type='text'
              inputType='joinGroup'
              placeholder=' P6aPE'
              fontSize={3}
              // on change currently doesnt work
              onChange={(e) => setCode(e.target.value)}
            ></UserInput>
          </div>
          <div className='Username_Box'>
            <div className='AddMargin'>  Enter Name</div>
            <div>
              <UserInput
                input
                type='text'
                inputType='joinGroup' // what is inputType
                placeholder=' Alex'
                fontSize={3}
                // on change currently doesnt work
                onChange={(e) => setName(e.target.value)}
              ></UserInput>
            </div>
          </div>
          <Link to={'Lobby/' + code}>
            {/* need to change to check or whatnot */}
            <button
              onClick={() => SocketEvents.joinRoom(socket, 'test', name)}
              className='GoButton'>
                Go
            </button>
            {/* need to check if this code inputted is correct */}
            {/* GET /sessions/:id 404 if does not exist */}
          </Link>
        </div>
      </div>
      <Link to='/'>
        <button className='SmallBtn' id='BackButton'>
          Back
        </button>
      </Link>

      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
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
