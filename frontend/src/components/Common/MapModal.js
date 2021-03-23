import React from 'react';
import './Help.css';
import Map from '../Map/Map';

/**
 *
 * @param {*} props
 * @return {*}
 */
function MapModal(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <Map restaurantLocations={props.restaurantLocation} />
        <button
          className='SmallBtn'
          id='CloseButton'
          onClick={() => props.setTrigger(false)}
        >
          close
        </button>
      </div>
    </div>
  ) : (
    ''
  );
}

export default MapModal;
