import React, {useState, useEffect} from 'react';

import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';

const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.588180029826!2d174.7669186152492!3d-36.85233777993783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47e383f32253%3A0xbd49f61f758a9e5b!2sThe%20University%20of%20Auckland!5e0!3m2!1sen!2snz!4v1615862553109!5m2!1sen!2snz';

/**
 *
 * @return {*}
 */
function ResultPage() {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  useEffect(() => {
    document.title = 'Time to go eat!';
  }, []);

  return (
    <>
      <div className='MakeCentre'>
        <h1 className='ResultTitle'>Top Choice</h1>
        <button
          onClick={() => setMapPopup(true)}
          className='BigBtn'
          id='GoogleMaps_btn'
        >
          View on Google Maps
          <Icon />
        </button>
        <MapModal trigger={MapPopup} setTrigger={setMapPopup} mapSrc={mapSrc}/>
      </div>

      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >help?</button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>You are all set! Click on [View on Google Maps]
          to see where you and your friends are going.</p>
      </Help>
    </>
  );
}

export default ResultPage;
