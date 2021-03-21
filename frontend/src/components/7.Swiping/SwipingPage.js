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
 *
 * @return {*}
 * @param {*} props
 */
function SwipingPage(props) {
  const history = useHistory();
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  const CardData = props.location.state;
  const [CardPass, setCardPass] = useState(null);

  const RemainingTime = '25';
  const [Data, setData] = useState(CardData.shift());
  const [redirect, setRedirect] = useState(false);

  const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.588180029826!2d174.7669186152492!3d-36.85233777993783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47e383f32253%3A0xbd49f61f758a9e5b!2sThe%20University%20of%20Auckland!5e0!3m2!1sen!2snz!4v1615862553109!5m2!1sen!2snz';
  useEffect(() => {
    document.title = 'Yes or No?';
    SocketEvents.endGame(socketContext.socket, goNextPge);
    setCardPass( props.location.state.slice());
  }, []);

  console.log(CardData);
  /**
   */
  const goNextPge = () => {
    console.log('Game has Ended');
    history.replace('/Result');
  };


  /**
 * @param {number} index
 * @return {void}
 */
  function clickedYes() {
    console.log('clicked yes');
    getNewCard();
  }

  /**
  *
  */
  function clickedNo() {
    console.log('clicked no');
    getNewCard();
  }

  /**
 * @param {null} Retrieves new restaurant details
 * @return {void}
 */
  function getNewCard() {
    try {
      if (CardData[0] !== undefined) {
        setData(CardData[0]);
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
          onClick = {clickedYes}
        >
          Keen!
        </button>
        <button
          className='YesOrNoButton'
          id='NoButton'
          onClick = {clickedNo}
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
        <MapModal
          trigger={MapPopup}
          setTrigger={setMapPopup}
          mapSrc={mapSrc}
          // mapCoords={Data.coords}
        />
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
