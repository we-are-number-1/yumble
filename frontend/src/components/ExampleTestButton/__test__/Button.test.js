import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';

test('Button snapshot testing', () => {
  const component = renderer.create(
      <Button text="Testing Button"></Button>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
