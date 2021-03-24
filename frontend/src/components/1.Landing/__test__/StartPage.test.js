import React from 'react';
import renderer from 'react-test-renderer';
import StartPage from '../StartPage';
import {BrowserRouter} from 'react-router-dom';

test('Start Page snapshot testing', () => {
  const component = renderer.create(
      <BrowserRouter>
        <StartPage />
      </BrowserRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
