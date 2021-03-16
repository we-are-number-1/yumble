import {Loader} from '@googlemaps/js-api-loader';

/**
 * Load Map function
 */
export default function loadMap() {
  const loader = new Loader({
    apiKey: 'AIzaSyCCyeBn-OwIHA-mpBzL42G7fu3_dpe8oC8',
    version: 'weekly',
  });

  loader.load().then(() => {
    new google.maps.Map(document.getElementById('map'), {
      /**
             * Lat (North Positive and South Negative)
             * Lng: (East positive and West Negative)
             */
      center: {lat: -36.8523, lng: 174.76914},
      zoom: 18,
    });
  });
}
