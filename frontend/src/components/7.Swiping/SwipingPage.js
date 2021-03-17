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
  const [ButtonPopup, setButtonPopup] = useState(false);
  const SwipedRight= [];

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
      <h1 className='TimeCounter'> Remaining time: 21s </h1>
      <div className='MakeCentre'>
        <button
          className='YesOrNoButton'
          id='YesButton'
          onClick = {clickedYes}>
            Keen!
        </button>
        <button className='YesOrNoButton' id='NoButton'>Nope!</button>
        <div className="SwipeCard" onClick = {cardClicked}>
          <div className="CardImage"></div>
          <p className='PlaceDetails' id = 'name'> {name} </p>
          <p className='PlaceDetails' id= 'location'> {location} </p>
          <p className='PlaceDetails' id = 'price'> {price} </p>
          <p className='PlaceDetails' id = 'cuisine'> {cuisine} </p>
          <p className='PlaceDetails' id = 'rating'> {rating} Rating</p>
        </div>
        {/* <button className='SmallBtn' id='DetailsButton'>
          View more detail
        </button> */}
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
