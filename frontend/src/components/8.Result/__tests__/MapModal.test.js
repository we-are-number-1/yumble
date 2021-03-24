import React from 'react';
import renderer from 'react-test-renderer';

import MapModal from '../../Common/MapModal';

test('MapModal snapshot testing without defining the trigger', () => {
  jest.mock('../../Map/Map', () => ({
    Map: 'Map',
  }));

  const tree = renderer
      .create(
          <MapModal
            retaurantLocation={{lat: -36.8523, lng: 174.7691}}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});

test('MapModal snapshot testing with defining a trigger', () => {
  //   const [MapPopup, setMapPopup] = useState(false);

  // Cache original functionality
  const realUseState = React.useState;

  // Stub the initial state
  const stubInitialState = 'stub data';

  // Mock useState before rendering your component
  jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => realUseState(stubInitialState));

  jest.mock('../../Map/Map', () => ({
    Map: 'Map',
  }));

  console.log({stubInitialState});
  const tree = renderer
      .create(
          <MapModal
          // trigger={MapPopup}
          // setTrigger={setMapPopup}
            trigger={stubInitialState}
            setTrigger={stubInitialState}
            retaurantLocation={{lat: -36.8523, lng: 174.7691}}
          />,
      )
      .toJSON();
  expect(tree).toMatchSnapshot();
});
