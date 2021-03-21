import React, {useState, useEffect} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';

/**
 * @param {*} props
 * @return {*}
 */
function ResultPage(props) {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);


  useEffect(() => {
    console.log(props.location.state);
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
        <MapModal trigger={MapPopup} setTrigger={setMapPopup} />
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
