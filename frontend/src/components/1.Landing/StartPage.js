import {Loader} from '@googlemaps/js-api-loader';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import getAPIKey from '../Common/getAPIKey';
import Help from '../Common/Help';
import '../Common/Help.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

/**
 *
 * @return {*}
 */
function StartPage() {
  useEffect(() => {
    document.title = 'Yumble: Find places to eat, fast';
  }, []);
  let apiKey;
  // Get API key from API instead of writing here for security reasons.
  getAPIKey(0).then((value) => {
    apiKey = value;
    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places'],
    });
    loader.load().then(() => {
    });
  });
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
