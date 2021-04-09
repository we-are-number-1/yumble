import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import '../Common/Help.css';

/**
 *
 * @return {*}
 */
function StartPage() {
  useEffect(() => {
    document.title = 'Yumble: Find places to eat, fast';
  }, []);

  const [show, setShow] = useState(false);
  return (
    <>
      {!show ? (
        <Container>
          <div className='MakeCentre'>
            <h1 className='StartTitle'>
              yumble
              <small
                className='text-muted'
                style={{'font-size': '2rem'}}
              >
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
      ) : (
        <Alert show={show} variant='info' id='Help-start'>
          <Alert.Heading>Welcome to Yumble! Join or Create Game</Alert.Heading>
          <p>
            Press the <mark> create group </mark> button to create a fresh lobby
            and be a host. To join a exisitng group lobby,press the
            <mark>join group</mark>
            button to join a group
          </p>
          <hr />
          <div className='d-flex justify-content-end'>
            <Button onClick={() => setShow(false)} variant='outline-danger'>
              Close me!
            </Button>
          </div>
        </Alert>
      )}
      {!show && (
        <Button
          id='HelpButton'
          variant='info'
          size='lg'
          onClick={() => setShow(true)}
        >
          Help
        </Button>
      )}
    </>
  );
}

export default StartPage;
