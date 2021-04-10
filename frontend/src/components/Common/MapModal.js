import React from 'react';
import './Help.css';
import Map from '../Map/Map';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**
 *
 * @param {*} props
 * @return {*}
 */ 
function MapModal(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <Alert variant='info' className="overflow-hidden">
          <Alert.Heading className="text-center">Restaurant Location</Alert.Heading>
          <p><Map restaurantLocations={props.restaurantLocation} /></p>
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

export default MapModal;
