import React from 'react';
import './Help.css';

/**
 *
 * @param {*} props
 * @return {*}
 */
function MapModal(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <iframe
          src={props.mapSrc}
          width="600"
          height="450"
          border="0"
          allowFullScreen=""
          loading="lazy"
        />
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
