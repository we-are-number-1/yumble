import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import ResultPage from '../ResultPage';

test('ResultPage snapshot testing', () => {
  // jest.mock('../../Common/SwipeCard', () => ({
  //   SwipeCard: 'SwipeCard',
  // }));

  // jest.mock('../../Map/Map', () => ({
  //   Map: 'Map',
  // }));

  const tree = renderer.create(
      <BrowserRouter>
        <ResultPage />
      </BrowserRouter>).toJSON();
  expect(tree).toMatchSnapshot();
});
