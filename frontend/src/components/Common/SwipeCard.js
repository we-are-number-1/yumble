import React from 'react';
import './SwipeCard.css';

/**
 * @return {void}
 */
function cardClicked() {
}

/**
*
* @param {*} props
* @return {*}
**/
function SwipeCard(props) {
  const data = props.data;
  const name = data.name;
  const images = data.images;
  const location = data.location;
  const price = data.price;
  const rating = data.rating.toFixed(1);

  return (
    <div className="SwipeCard" onClick = {cardClicked}>
      <div className="CardImage">
        <img className="CardImage" src={images} ></img>
      </div>
      <div>
        <p className='PlaceDetails' id = 'name'> {name} </p>
      </div>
      <p className='PlaceDetails' id= 'location'> {location} </p>
      <p className='PlaceDetails' id = 'price'> {price} </p>
      <p className='PlaceDetails' id = 'rating'> {rating} Rating</p>
    </div>
  );
}
export default SwipeCard;
