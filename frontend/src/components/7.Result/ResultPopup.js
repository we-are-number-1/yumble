import React from 'react';
import '../Common/Help.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**
 *
 * @param {*} props
 * @return {*}
 */
 function Result(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <Alert variant='info'>
          <Alert.Heading className="text-center"> Voting Choice Breakdown </Alert.Heading>
          {props.children}
          <br></br>
          <Button
            variant='outline-danger'
            onClick={() => props.setTrigger(false)}
          >
            close!
          </Button>

        </Alert>
      </div>
    </div>
  ) : (
    ''
  );
}

export default Result;