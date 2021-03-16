import React, {useEffect, useRef, useState} from 'react';
import loadMap from '../../api-pulling/LoadMap';
import styles from './Map.module.css';

// eslint-disable-next-line valid-jsdoc
/**
 * @param {*} param0
 */
function Map() {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const componentRef = useRef();
  const outputComponent = <div id='map' className={styles.map}
    ref={componentRef}></div>;

  useEffect(() => {
    if (map === null && marker === null) {
      const {marker, map} = loadMap(componentRef.current);
      setMap(map);
      setMarker(marker);
    }
  });

  return outputComponent;
}

export default Map;
