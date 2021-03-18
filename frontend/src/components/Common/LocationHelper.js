import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

/**
 * @param  {String} value the string address value
 */
export async function getLocationCoordinates(value) {
  const results = await geocodeByAddress(value);
  return await getLatLng(results[0]);
}
