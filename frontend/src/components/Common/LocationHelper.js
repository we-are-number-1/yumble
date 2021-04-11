import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {getRestaurantCards} from './getRestaurantCards';

/**
 * @param  {String} value the string address value
 */
export async function getLocationCoordinates(value) {
  const results = await geocodeByAddress(value);
  return await getLatLng(results[0]);
}

let cards = null;
/**
 * @param  {Object} coordinates Object with lat and lng values
 * @param  {number} radius The radius around the defined coordinates
 * @param  {number} maxPriceLevel is the max value of the research result
 */
export async function getNearbyRestaurants(coordinates,
    radius,
    maxPriceLevel) {
  const pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
  const dummyMap = new google.maps.Map(document.getElementById('dummyMap'), {
    center: pyrmont,
    zoom: 15,
  });

  const request = {
    location: {lat: coordinates.lat, lng: coordinates.lng},
    radius: radius,
    type: ['restaurant'], // Default value
    maxPriceLevel: maxPriceLevel,
  };
  const service = new google.maps.places.PlacesService(dummyMap);

  const cardsPromise = new Promise((resolve, reject) =>
    service.nearbySearch(request, async (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        cards = await getRestaurantCards(results,
            parseLatAndLng(results));
        resolve(cards);
      }
    },
    ));
  return cardsPromise;
}

/**
* @param  {[Object]} list A list of objects
* @return {[Object]} A list of cards schemas
*/
function parseLatAndLng(list) {
  const nearbyCoordinatesList = [];
  list.forEach((element) => {
    const lat = element.geometry.location.lat();
    const lng = element.geometry.location.lng();
    nearbyCoordinatesList.push({lat, lng});
  });
  return nearbyCoordinatesList;
}
