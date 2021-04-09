import React from 'react';
import './Help.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
/**
 *
 * @param {*} props
 * @return {*}
 */
function Help(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <Alert variant='info'>
          <Alert.Heading>We are here to Help!</Alert.Heading>
          <p>{props.children}</p>
          <Button
            variant='outline-danger'
            onClick={() => props.setTrigger(false)}
          >
            close!
          </Button>
          <hr />
        </Alert>
      </div>
    </div>
  ) : (
    ''
  );
}

export default Help;
