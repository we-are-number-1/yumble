import React, {useEffect, useState} from 'react';
import loadMap from '../../api-pulling/LoadMap';
import '../Common/Help.css';

/**
 *
 * @param {*} param0
 * @return {*}
 */
function Map({restaurantLocations}) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  /* The method either loads the map for the first time or
     it changes the position the map is pointing to.
  */
  useEffect(() => {
    if (map === null && marker === null) {
      loadMap(document.getElementById('map'),
          restaurantLocations, setMap, setMarker);
    } else {
      map.setCenter(restaurantLocations);
      marker.setPosition(restaurantLocations);
    }
  }, [restaurantLocations]);

  // I think google's API is doing something here where i need to override with !important, 
  // the previous group had it fixed at 600x400px but I removed that to make dynamically scaling at least.
  // I dont know why but making the height 100%!important makes it disappear again.
  return <div id='map' style={{width: '100%!important', height: '400px'}} />;
}

export default Map;
