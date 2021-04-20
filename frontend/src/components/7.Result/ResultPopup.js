import React from 'react';
import '../Common/Help.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**
 * @param {*} props
 * @return {*}
 *
 * Popup for showing the pie chart Component that represents the
 * data of all votes in a game
 *
 */
function Result(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <Alert className='AlertContent'>
          <Alert.Heading className='text-center'>Voting Choice Breakdown</Alert.Heading>
          <hr />
          {props.children}
          <br></br>
          <Button variant='outline-danger' onClick={() => props.setTrigger(false)}>
            Close
          </Button>
        </Alert>
      </div>
    </div>
  ) : (
    ''
  );
}

export default Result;
