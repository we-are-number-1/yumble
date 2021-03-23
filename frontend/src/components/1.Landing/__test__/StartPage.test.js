import React from 'react';
import renderer from 'react-test-renderer';
import StartPage from '../StartPage';

test('Start Page snapshot testing', () => {
  const component = renderer.create(
      <StartPage />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
