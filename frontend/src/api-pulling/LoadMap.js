import {Loader} from '@googlemaps/js-api-loader';

// eslint-disable-next-line valid-jsdoc
/**
 * A function that loads Google's map for the first time.
 * NOTE: Added map div in index.html.
 * Once the map component is finished then it can be replaced.
 * Add loadMap() function to index.js once complete.
 * @return {Objects} Google Map and Marker
 */
export default function loadMap(componentRef) {
  let map;
  let marker;

  const loader = new Loader({
    apiKey: 'AIzaSyCCyeBn-OwIHA-mpBzL42G7fu3_dpe8oC8',
    version: 'weekly',
  });

  // Need to change document.getElementById('map') to it a React component.
  loader.load().then(() => {
    map = new google.maps.Map(componentRef, {
      /**
             * Lat (North Positive and South Negative)
             * Lng: (East positive and West Negative)
             * Currently, the map is pointing to UOA
      */
      center: {lat: -36.8523, lng: 174.76914},
      zoom: 18,
    });

    marker = new google.maps.Marker({
      position: {lat: -36.8523, lng: 174.76914},
      map: map,
    });
  });

  return {map, marker};
}
