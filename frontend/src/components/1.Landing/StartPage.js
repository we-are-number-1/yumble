import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import '../Common/Help.css';
import Help from '../Common/Help';
/**
 *
 * @return {*}
 */
function StartPage() {
  useEffect(() => {
    document.title = 'Yumble: Find places to eat, fast';
  }, []);

  const [ButtonPopup, setButtonPopup] = useState(false);
  return (
    <>
      <Container>
        <div className='MakeCentre'>
          <h1 className='StartTitle'>
            yumble
            <small className='text-muted' style={{'fontSize': '2rem'}}>
              2.0
            </small>
          </h1>
          <Link to='/Preferences'>
            <Button
              variant='warning'
              size='lg'
              className='BigBtn'
              id='CreateGroup_btn'
            >
              Create group
            </Button>
          </Link>
          <Link to='/JoinGroup'>
            <Button
              size='lg'
              variant='success'
              className='BigBtn'
              id='JoinGroup_btn'
            >
              Join group
            </Button>
          </Link>
        </div>
      </Container>

      <Button
        onClick={() => setButtonPopup(true)}
        variant='info'
        size='lg'
        id='HelpButton'
      >
        Help
      </Button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          Press the <mark> create group </mark> button to create a fresh lobby
          and be a host. To join a exisitng group lobby,press the
          <mark>join group</mark>
          button to join a group
        </p>
      </Help>
    </>
  );
}

export default StartPage;
