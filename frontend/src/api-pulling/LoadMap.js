import {Loader} from '@googlemaps/js-api-loader';

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

    setMap(map);
    setMarker(marker);
  });
}
