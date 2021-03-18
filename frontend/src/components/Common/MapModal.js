import React from 'react';
import './Help.css';
import Map from '../Map/Map';

/**
 *
 * @param {*} props
 * @return {*}
 * Currently the restuarant coordinates are hard coded.
 * Once the location search box is complete, then we can modify the code.
 * TODO: remove hard coded locations.
 */
function MapModal(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <Map
          restaurantLocations={[{lat: -36.8523, lng: 174.76914},
            {lat: -34.397, lng: 150.644}, {lat: -36.8523, lng: 174.76914}]}
          currentRestaurantIndex={0} />
        <button
          className='SmallBtn'
          id='CloseButton'
          onClick={() => props.setTrigger(false)}
        >
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ''
  );
}

export default MapModal;
