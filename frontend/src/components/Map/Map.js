import React, {useEffect, useRef, useState} from 'react';
import loadMap from '../../api-pulling/LoadMap';
import styles from './Map.module.css';

// eslint-disable-next-line valid-jsdoc
/**
 * @param {*} param0
 */
function Map({restaurantLocations, currentRestaurantIndex}) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const componentRef = useRef();

  // This was declared here because the API needed reference to this component
  const outputComponent = <div id='map' className={styles.map}
    ref={componentRef}></div>;


  /* The method either loads the map for the first time or
     it changes the position the map is pointing to.
  */
  useEffect(() => {
    if (map === null && marker === null) {
      loadMap(componentRef.current,
          restaurantLocations[currentRestaurantIndex], setMap, setMarker);
      setMap(map);
      setMarker(marker);
    } else {
      map.setCenter(restaurantLocations[currentRestaurantIndex]);
      marker.setPosition(restaurantLocations[currentRestaurantIndex]);
    }
  }, [restaurantLocations, currentRestaurantIndex]);


  return outputComponent;
}

export default Map;
