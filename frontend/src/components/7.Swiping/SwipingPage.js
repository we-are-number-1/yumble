import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Help from '../Common/Help';
import '../Common/Help.css';
import MapModal from '../Common/MapModal';
import Icon from '../Common/MapsPinpoint';

const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.588180029826!2d174.7669186152492!3d-36.85233777993783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47e383f32253%3A0xbd49f61f758a9e5b!2sThe%20University%20of%20Auckland!5e0!3m2!1sen!2snz!4v1615862553109!5m2!1sen!2snz';


/**
 *
 * @return {*}
 */
function SwipingPage() {
  const [ButtonPopup, setButtonPopup] = useState(false);
  const [MapPopup, setMapPopup] = useState(false);
  const SwipedRight= [];

  const RemainingTime = '25';
  let name = 'Lonestar';
  let location = 'Botany';
  let cuisine = 'European';
  let price = '$$$';
  let rating = '4.0';

  useEffect(() => {
    document.title = 'Yes or No?';
  }, []);

  const hitDummyEndpoint = () => {
    axios.get('/sessions/testCard').then((response) =>{
      console.log(response.data);
    });
  };
  /**
 * @param {null} Adds the current restaurant details to array which stores
 * all right-swiped restaurants.
 * @return {void}
 */
  function clickedYes() {
    console.log('clicked yes');
    const restaurant = {name, location, cuisine, price, rating};
    SwipedRight.push(restaurant);
    console.log(SwipedRight);
    getNewCard();
    hitDummyEndpoint();
  }

  /**
 * @param {null} Retrieves new restaurant details
 * @return {void}
 */
  function getNewCard() {
    name = 'Burger King';
    location = 'Manukau';
    cuisine = 'Cheap shit';
    price = '$';
    rating = '3.0';
  }
  /**
 * @param {null} Retrieves new restaurant details
 * @return {void}
 */
  function cardClicked() {
    console.log('Card clicked');
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
        <div className="SwipeCard" onClick = {cardClicked}>
          <div className="CardImage"></div>
          <p className='PlaceDetails' id = 'name'> {name} </p>
          <p className='PlaceDetails' id= 'location'> {location} </p>
          <p className='PlaceDetails' id = 'price'> {price} </p>
          <p className='PlaceDetails' id = 'cuisine'> {cuisine} </p>
          <p className='PlaceDetails' id = 'rating'> {rating} Rating</p>
        </div>
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
          - Press yes if you are keen to potentially visit this restaurant
          otherwise press no.
          <br></br>
          - View this restaurant on the map by clicking the green button
          below the card.
        </p>
      </Help>
    </>
  );
}

export default SwipingPage;
