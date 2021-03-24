import React from 'react';
import renderer from 'react-test-renderer';

import Result from '../ResultPage';

test('ResultPage snapshot testing', () => {
  jest.mock('../../Common/SwipeCard', () => ({
    SwipeCard: 'SwipeCard',
  }));
  const tree = renderer.create(<Result />).toJSON();
  expect(tree).toMatchSnapshot();
});
