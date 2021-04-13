import React from 'react';
import './Help.css';
import Map from '../Map/Map';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**
 *
 * @param {*} props
 * @return {*}
 *
 * Popup for showing the map Component that represents the
 * location of a specific Restaurant
 */
function MapModal(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <Alert className='AlertContent'>
          <Alert.Heading className='text-center'>
            Restaurant Location
          </Alert.Heading>
          <hr />
          <p>
            <Map restaurantLocations={props.restaurantLocation} />
          </p>
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

export default MapModal;
