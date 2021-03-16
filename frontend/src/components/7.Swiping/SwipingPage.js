import React, {useEffect} from 'react';
import axios from 'axios';
import React, {useState} from 'react';
import Help from '../Common/Help';
import '../Common/Help.css';

/**
 *
 * @return {*}
 */
function SwipingPage() {
  useEffect(() => {
    document.title = 'Yes or No?';
  }, []);

  const hitDummyEndpoint = () => {
    axios.get('/sessions/testCard').then((response) =>{
      console.log(response.data);
    });
  };

  return (
    <>
      <h1 className='Title'> yumble</h1>
      <h1 className='TimeCounter'> Remaining time: 21s </h1>
      <div className='MakeCentre'>
        <button className='YesOrNoButton' id='YesButton'>Keen!</button>
        <button className='YesOrNoButton' id='NoButton'>Nope!</button>
        <div className="SwipeCard">
          <div className="CardImage"></div>
          </div>
          {/* <button className='SmallBtn' id='DetailsButton'>
            View more detail
          </button> */}
        </div>
        <button className='BigBtn'>View on google maps</button>
      </div>
      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <text>
          - Press yes if you are keen to potentially visit this restaurant
          otherwise press no.
          <br></br>
          - View this restaurant on the map by clicking the green button
          below the card.
        </text>
      </Help>
    </>
  );
}

export default SwipingPage;
