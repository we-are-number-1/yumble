import React, {useState} from 'react';
import Map from './Map';

// eslint-disable-next-line valid-jsdoc
/**
 *
 * @param {*} param0
 * @returns
 */
function MapModal({trigger, setTrigger}) {
  const [index, setIndex] = useState(0);

  return trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <button
          className='SmallBtn'
          id='CloseButton'
          onClick={() => {
            setTrigger(false); setIndex(1);
          }}
        >
          close
        </button>
        <Map
          restaurantLocations={[{lat: -36.8523, lng: 174.76914},
            {lat: -34.397, lng: 150.644}, {lat: -36.8523, lng: 174.76914}]}
          currentRestaurantIndex={index} />
      </div>
    </div>
  ) : (
    ''
  );
}

export default MapModal;
