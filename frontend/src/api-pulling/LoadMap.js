import {Loader} from '@googlemaps/js-api-loader';
import getAPIKey from '../components/Common/getAPIKey';

/**
 *
 * @param {*} componentRef
 * @param {*} restaurantLocation
 * @param {*} setMap
 * @param {*} setMarker
 */
export default function loadMap(componentRef, restaurantLocation,
    setMap, setMarker) {
  let map;
  let marker;
  let apiKey;

  // Get API key from API instead of writing here for security reasons.
  getAPIKey(0).then((value) => apiKey = value);

  const loader = new Loader({
    apiKey: apiKey,
    version: 'weekly',
  });

  loader.load().then(() => {
    map = new google.maps.Map(componentRef, {
      /**
             * Lat (North Positive and South Negative)
             * Lng: (East positive and West Negative)
      */
      center: restaurantLocation,
      zoom: 18,
    });

    marker = new google.maps.Marker({
      position: restaurantLocation,
      map: map,
    });

    setMap(map);
    setMarker(marker);
  });
}
