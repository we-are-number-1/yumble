import React from 'react';
import renderer from 'react-test-renderer';

import ResultPage from '../ResultPage';

test('ResultPage snapshot testing', () => {
  const tree = renderer.create(<ResultPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
