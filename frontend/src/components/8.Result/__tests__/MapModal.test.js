import React from 'react';
import renderer from 'react-test-renderer';

import MapModal from '../../Common/MapModal';

test('MapModal snapshot testing with/without defining the trigger', () => {
  // Cache original functionality
  const mockSetMapPopup = React.useState;

  // Stub the initial state
  const MapPopup = 'true';

  // Mock useState before rendering the MapModal component
  jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => mockSetMapPopup(false));

  jest.mock('../../Map/Map', () => ({
    Map: 'Map',
  }));

  // Testing without defining the trigger
  const tree1 = renderer
      .create(
          <MapModal
            retaurantLocation={{lat: -36.8523, lng: 174.7691}}
          />,
      )
      .toJSON();
  expect(tree1).toMatchSnapshot();

  // Testing with defining the trigger
  const tree2 = renderer
      .create(
          <MapModal
            trigger={MapPopup}
            setTrigger={mockSetMapPopup}
            retaurantLocation={{lat: -36.8523, lng: 174.7691}}
          />,
      )
      .toJSON();
  expect(tree2).toMatchSnapshot();
});
