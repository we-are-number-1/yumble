import {Loader} from '@googlemaps/js-api-loader';

/**
 * loadMap() is a function which loads a map into the program
 * for the first time.
 * @param {Ref} componentRef - Reference to Map Component
 * @param {JSON} restaurantLocation - Restaurant location which
 * the map needs to point to.
 * @return {Object} Marker and Map objects
 */
export default function loadMap(componentRef, restaurantLocation) {
  let map;
  let marker;

  const loader = new Loader({
    apiKey: 'AIzaSyCCyeBn-OwIHA-mpBzL42G7fu3_dpe8oC8',
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
  });

  return {map, marker};
}
