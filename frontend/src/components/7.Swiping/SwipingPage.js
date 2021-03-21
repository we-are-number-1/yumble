import React, {useEffect, useState, useContext} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
// import axios from 'axios';

import {SocketContext} from './../../sockets/SocketContext';
import * as SocketEvents from './../../sockets';
import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';
import '../7.Swiping/SwipingPage.css';
import SwipeCard from '../Common/SwipeCard';

/**
 * @return {*}
 * @param  {*} props
 */
function SwipingPage(props) {
  const history = useHistory();
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  const CardData = props.location.state;
  const [CardPass, setCardPass] = useState(null);

  const RemainingTime = '25';
  const [Data, setData] = useState(CardData[0]); // 0th element
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    document.title = 'Yes or No?';
    SocketEvents.endGame(socketContext.socket, goNextPge);
    setCardPass(props.location.state.slice());
    CardData.shift();
  }, []);

  console.log(CardData);
  /**
   */
  const goNextPge = () => {
    console.log('Game has Ended');
    history.replace('/Result');
  };

  /**
  *
  *
  */
  function getNewCard() {
    console.log('CLICK');
    try {
      if (CardData[0] !== undefined) {
        setData(CardData.shift());
      } else {
        setRedirect(true);
      }
    } catch (error) {
      setRedirect(true);
    }
  }

  return (
    <>
      <h1 className='Title'> yumble</h1>
      <h1 className='TimeCounter'> Remaining time: {RemainingTime}s</h1>
      <div className='MakeCentre'>
        <button
          className='YesOrNoButton'
          id='YesButton'
          onClick = {getNewCard}
        >
          Keen!
        </button>
        <button
          className='YesOrNoButton'
          id='NoButton'
          onClick = {getNewCard}
        >
          Nope!
        </button>

        <SwipeCard data = {Data} ></SwipeCard>

        <button
          onClick={() => setMapPopup(true)}
          className='BigBtn'
          id='GoogleMaps_btn'
        >
          View on Google Maps
          <Icon />
        </button>
        <MapModal trigger={MapPopup} setTrigger={setMapPopup}
          restaurantLocation={Data.coords}/>
      </div>
      <button
        onClick={() => setButtonPopup(true)}
        className='SmallBtn'
        id='HelpButton'
      >
        help?
      </button>
      <Help trigger={ButtonPopup} setTrigger={setButtonPopup}>
        <p>
          - Click Keen! if you are keen to potentially visit this restaurant
          otherwise click Nope!.
          <br></br>
          - View this restaurant on the map by clicking the green button
          below the card.
        </p>
      </Help>
      {redirect && <
        Redirect to={{pathname: '/Result', state: CardPass}}/>}
    </>
  );
}

export default SwipingPage;
