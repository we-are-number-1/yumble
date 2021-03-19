const google = window.google;

/**
 * @param  {Object} coordinates Object with lat and lng values
 * @param  {number} radius The radius around the defined coordinates
 * @param  {String} keyword Cuisine keyword
 */
export async function getNearbyRestaurants(coordinates, radius, keyword) {
  const pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
  const dummyMap = new google.maps.Map(document.getElementById('dummyMap'), {
    center: pyrmont,
    zoom: 15,
  });

  const request = {
    location: {lat: coordinates.lat, lng: coordinates.lng},
    radius: radius,
    type: ['restaurant'], // Default value
    keyword: keyword,
  };
  const service = new google.maps.places.PlacesService(dummyMap);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      parseLatAndLng(results);
    }
  },
  );
}

/**
* @param  {[Object]} list A list of objects
*/
function parseLatAndLng(list) {
  const nearbyCoordinatesList = [];
  list.forEach((element) => {
    const lat = element.geometry.location.lat();
    const lng = element.geometry.location.lng();
    nearbyCoordinatesList.push({lat, lng});
  });
  console.log(nearbyCoordinatesList);
}
