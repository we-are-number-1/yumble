import React from 'react';
import './Help.css';

const iFrame = () => {
  const ifrm = document.createElement('iframe');
  ifrm.setAttribute('src', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.588180029826!2d174.7669186152492!3d-36.85233777993783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47e383f32253%3A0xbd49f61f758a9e5b!2sThe%20University%20of%20Auckland!5e0!3m2!1sen!2snz!4v1615862553109!5m2!1sen!2snz');
  ifrm.style.width = '600';
  ifrm.style.height = '450';
  ifrm.style.border = '0';
  ifrm.allowFullscreen='';
  ifrm.loading = 'lazy';
};

/**
 *
 * @param {*} props
 * @return {*}
 */
function MapModal(props) {
  return props.trigger ? (
    <div className='Help'>
      <div className='Help-inner'>
        <button
          className='SmallBtn'
          id='CloseButton'
          onClick={() => {
            props.setTrigger(false);
            iFrame();
          }}
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
