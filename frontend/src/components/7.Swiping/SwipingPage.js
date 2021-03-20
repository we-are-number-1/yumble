import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {SocketContext} from './../../sockets/SocketContext';
import * as SocketEvents from './../../sockets';
import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';
import '../7.Swiping/SwipingPage.css';
import SwipeCard from '../Common/SwipeCard';

const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.588180029826!2d174.7669186152492!3d-36.85233777993783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47e383f32253%3A0xbd49f61f758a9e5b!2sThe%20University%20of%20Auckland!5e0!3m2!1sen!2snz!4v1615862553109!5m2!1sen!2snz';

/**
 *
 * @return {*}
 */
function SwipingPage() {
  const history = useHistory();
  const socketContext = useContext(SocketContext);
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  const SwipedRight= [];

  // Dummy data, should be retrieved by sockets
  const RemainingTime = '25';
  let name = 'Lonestar';
  let location = 'Botany';
  let cuisine = 'European';
  let price = '$$$';
  let rating = '4.0';
  let id = '36472';
  const Data = {name, location, cuisine, price, rating};

  useEffect(() => {
    document.title = 'Yes or No?';
    SocketEvents.endGame(socketContext.socket, goNextPge);
  }, []);

  /**
   */
  const goNextPge = () => {
    console.log('Game has Ended');
    history.replace('/Result');
  };

  const hitDummyEndpoint = () => {
    axios.get('/sessions/testCard').then((response) =>{
      console.log('Dummy data:', response.data);
    });
  };

  hitDummyEndpoint();

  /**
 * @param {null} Adds the current restaurant details to array which stores
 * all right-swiped restaurants.
 * @return {void}
 */
  function clickedYes() {
    console.log('clicked yes');
    const restaurantId = {name, id};
    SwipedRight.push(restaurantId);
    console.log(SwipedRight);
    console.log(SwipedRight.length);
    getNewCard();
  }

  /**
 * @param {null} Retrieves new restaurant details
 * @return {void}
 */
  function getNewCard() {
    // Dummy data, should be retrieved by sockets
    name = 'Burger King';
    location = 'Manukau';
    cuisine = 'Cheap food';
    price = '$';
    rating = '3.0';
    id = '287376923';
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
        <MapModal trigger={MapPopup} setTrigger={setMapPopup} mapSrc={mapSrc}/>
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
    </>
  );
}

export default SwipingPage;
