import axios from 'axios';
import getAPIKey from './getAPIKey';

/* eslint-disable */

let clientCreds;
let clientID;
let clientSecret;

let dollar = "$";

export async function getRestaurantCards(restaurants, coords) {
  var cards = [];

  clientCreds = await getAPIKey(1);
  clientID = clientCreds[0];
  clientSecret = clientCreds[1];

  for (let i = 0; i < restaurants.length; i++) {
    var price;
    var suburb;

    const menu = await getMenu(20200305, coords[i].lat, coords[i].lng, restaurants[i].name);

    // get the suburb by some quick string operations
    suburb = restaurants[i].vicinity.split(", ");
    suburb = suburb[suburb.length - 2];

    // some restaurants dont have a price level -- default to "$"
    if (restaurants[i].price_level !== undefined) {
      price = dollar.repeat(restaurants[i].price_level+1);
    } else {
      price = "$";
    }

    try {
      const card = {
          name: restaurants[i].name,
          location: suburb,
          price: price,
          images: restaurants[i].photos[0].getUrl(600),
          menu: menu,
          rating: restaurants[i].rating,
          cuisine: "Kiwiana",
          coords: coords[i],
      };
      cards.push(card);
    } catch (error) {
      console.log(restaurants[i]);
      console.log(error);
    }
  }

  console.log(cards);
  return cards;
}

async function getMenu(v, lat, long, name) {
  let id = await search(v, lat, long, name);
  if (id !== undefined && id !== false) {
      var config = {
          method: 'get',
          url: `https://api.foursquare.com/v2/venues/${id.slice(1, -1)}/menu?client_id=${clientID}&client_secret=${clientSecret}&v=${v}`,
          headers: { }
      };

      try {
          let response = await axios(config);
          return JSON.stringify(response.data.response.menu);
      } catch (error) {
          console.log(`Couldn't find ${name}'s menu on Foursquare`);
      }

  } else {
      return null;
  }
}

async function search(v, lat, long, name) {
  let intent = "match";

  var config = {
      method: 'get',
      url: `https://api.foursquare.com/v2/venues/search?client_id=${clientID}&client_secret=${clientSecret}&v=${v}&ll=${lat},${long}&name='${name}'&intent=${intent}`,
      headers: { }
  };

  try {
      var response = await axios(config)
      var id = JSON.stringify(response.data.response.venues[0].id);
  } catch (error) {
      console.log(`Couldn't find ${name} on Foursquare`);
  }

  return id;
}

/* eslint-enable */
