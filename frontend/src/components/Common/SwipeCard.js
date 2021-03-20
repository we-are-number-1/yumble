import React from 'react';
import './SwipeCard.css';

/**
 * @param {null} Retrieves new restaurant details
 * @return {void}
 */
function cardClicked() {
  console.log('Card clicked');
}

/**
*
* @param {*} props
* @return {*}
**/
function SwipeCard(props) {
  const data = props.data;
  const name = data.name;
  const location = data.location;
  const cuisine = data.cuisine;
  const price = data.price;
  const rating = data.rating;

  return (
    <div className="SwipeCard" onClick = {cardClicked}>
      <div className="CardImage"></div>
      <p className='PlaceDetails' id = 'name'> {name} </p>
      <p className='PlaceDetails' id= 'location'> {location} </p>
      <p className='PlaceDetails' id = 'price'> {price} </p>
      <p className='PlaceDetails' id = 'cuisine'> {cuisine} </p>
      <p className='PlaceDetails' id = 'rating'> {rating} Rating</p>
    </div>
  );
}
export default SwipeCard;
