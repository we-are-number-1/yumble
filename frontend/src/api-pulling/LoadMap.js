/**
 *
 * @param {*} componentRef
 * @param {*} restaurantLocation
 * @param {*} setMap
 * @param {*} setMarker
 */
export default function loadMap(componentRef, restaurantLocation,
    setMap, setMarker) {
  const map = new google.maps.Map(componentRef, {
    center: restaurantLocation,
    zoom: 18,
  });
  const marker = new google.maps.Marker({
    position: restaurantLocation,
    map: map,
  });
  setMap(map);
  setMarker(marker);
}
