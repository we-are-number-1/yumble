import React from 'react';
import renderer from 'react-test-renderer';
import JoinPage from '../JoinGroup';
import {BrowserRouter} from 'react-router-dom';

test('Join Page snapshot testing', () => {
  const component = renderer.create(
      <BrowserRouter>
        <JoinPage />
      </BrowserRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
