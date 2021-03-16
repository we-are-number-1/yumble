import {Loader} from '@googlemaps/js-api-loader';

/**
 * A function that loads Google's map for the first time.
 * NOTE: Added map div in index.html.
 * Once the map component is finished then it can be replaced.
 * Add loadMap() function to index.js once complete.
 */
export default function loadMap() {
  let map;

  const loader = new Loader({
    apiKey: 'AIzaSyCCyeBn-OwIHA-mpBzL42G7fu3_dpe8oC8',
    version: 'weekly',
  });

  // Need to change document.getElementById('map') to it a React component.
  loader.load().then(() => {
    map = new google.maps.Map(document.getElementById('map'), {
      /**
             * Lat (North Positive and South Negative)
             * Lng: (East positive and West Negative)
             * Currently, the map is pointing to UOA
      */
      center: {lat: -36.8523, lng: 174.76914},
      zoom: 18,
    });

    new google.maps.Marker({
      position: {lat: -36.8523, lng: 174.76914},
      map: map,
    });
  });
}
