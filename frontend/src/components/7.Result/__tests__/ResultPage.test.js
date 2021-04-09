import React from 'react';
import renderer from 'react-test-renderer';

import ResultPage from '../ResultPage';

test('ResultPage snapshot testing when there is result', () => {
  const tree = renderer.create(<ResultPage hasResult={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});


