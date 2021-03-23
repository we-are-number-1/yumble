import React from 'react';
import renderer from 'react-test-renderer';

import MapModal from '../../Common/MapModal';

test('MapModal snapshot testing', () => {
//   const [MapPopup, setMapPopup] = useState(false);
  const tree = renderer
      .create(
          <MapModal
            // trigger={MapPopup}
            // setTrigger={setMapPopup}
            retaurantLocation={{lat: -36.8523, lng: 174.7691}}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});
