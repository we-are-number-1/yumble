import React from 'react';
import './Help.css';

/**
 *
 * @param {*} props
 * @return {*}
 */
function Help(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
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

export default Help;
