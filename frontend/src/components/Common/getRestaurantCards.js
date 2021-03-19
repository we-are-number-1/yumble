import axios from 'axios';

/* eslint-disable */
let clientID = '';
let clientSecret = '';
let googleAPIKey = '';

let dollar = "$";

export async function getRestaurantCards(restaurants, coords) {
    var cards = [];
    
    for (let i = 0; i < restaurants.length; i++) {
        const menu = await getMenu(20200305, coords[i].lat, coords[i].lng, restaurants[i].name);

        let suburb = restaurants[i].vicinity.split(", ");
        suburb = suburb[suburb.length - 2];

        const card = {
            name: restaurants[i].name,
            location: suburb,
            price: dollar.repeat(restaurants[i].price_level),
            images: restaurants[i].photos[0].getUrl(600),
            menu: menu,
            rating: restaurants[i].rating,
            cuisine: "Kiwiana"
        }

        cards.push(card);
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
            return JSON.stringify(response.data.response.menu.menus);
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
        return false;
    }

    return id;
}
/* eslint-enable */
