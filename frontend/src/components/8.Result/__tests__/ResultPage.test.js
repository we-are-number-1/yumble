import React from 'react';
import renderer from 'react-test-renderer';

import Result from '../ResultPage';

test('ResultPage snapshot testing', () => {
  jest.mock('../../Common/SwipeCard', () => ({
    SwipeCard: 'SwipeCard',
  }));

  jest.mock('../../Map/Map', () => ({
    Map: 'Map',
  }));

  const tree = renderer.create(<Result />).toJSON();
  expect(tree).toMatchSnapshot();
});
