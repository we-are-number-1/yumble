/* eslint-disable */

let dollar = "$";

export async function getRestaurantCards(restaurants, coords) {
  var cards = [];

  for (let i = 0; i < restaurants.length; i++) {
    var price;
    var suburb;
    
    // get the suburb by some quick string operations
    suburb = restaurants[i].vicinity.split(", ");
    suburb = suburb[suburb.length - 2];

    // some restaurants dont have a price level -- default to "$"
    price = (restaurants[i].price_level !== undefined) ? dollar.repeat(restaurants[i].price_level) : "$";

    try {
      const card = {
          name: restaurants[i].name,
          location: suburb,
          price: price,
          images: restaurants[i].photos[0].getUrl(600),
          rating: restaurants[i].rating,
          coords: coords[i],
      };
      cards.push(card);
    } catch (error) {
      console.log(error);
    }
  }
  return cards;
}

/* eslint-enable */
