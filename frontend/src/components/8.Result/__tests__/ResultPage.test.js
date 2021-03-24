import React from 'react';
import renderer from 'react-test-renderer';

import Result from '../ResultPage';

test('ResultPage snapshot testing', () => {
  const tree = renderer.create(<Result />).toJSON();
  expect(tree).toMatchSnapshot();
});
