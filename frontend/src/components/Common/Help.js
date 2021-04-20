import React from 'react';
import './Help.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
/**
 *
 * @param {*} props
 * @return {*}
 *
 * This is the help popup that is global across the Yumble application
 * The popup will present useful guidance to the user.
 * The help message is changed depending on which screen the help button is clicked from.
 */
function Help(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <Alert className='AlertContent'>
          <Alert.Heading>{props.isShare ? 'Share the group code' : 'We are here to Help!'}</Alert.Heading>
          <hr />
          <p>{props.children}</p>
          <Button
            variant='outline-danger'
            onClick={() => props.setTrigger(false)}
          >
            Close
          </Button>
        </Alert>
      </div>
    </div>
  ) : (
    ''
  );
}

export default Help;
