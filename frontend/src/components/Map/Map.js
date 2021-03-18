import React, {useEffect, useState} from 'react';
import loadMap from '../../api-pulling/LoadMap';
import '../Common/Help.css';

/**
 *
 * @param {*} param0
 * @return {*}
 */
function Map({restaurantLocations, currentRestaurantIndex}) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  /* The method either loads the map for the first time or
     it changes the position the map is pointing to.
  */
  useEffect(() => {
    if (map === null && marker === null) {
      loadMap(document.getElementById('map'),
          restaurantLocations[currentRestaurantIndex], setMap, setMarker);
    } else {
      map.setCenter(restaurantLocations[currentRestaurantIndex]);
      marker.setPosition(restaurantLocations[currentRestaurantIndex]);
    }
  }, [restaurantLocations, currentRestaurantIndex]);


  return <div id='map' style={{width: '600px', height: '400px'}} />;
}

export default Map;
