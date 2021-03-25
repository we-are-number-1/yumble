import React from 'react';
import renderer from 'react-test-renderer';
import MapPinpoint from '../MapsPinpoint';

test('Maps Pinpoint snapshot testing', () => {
  const component = renderer.create(
      <>
        <MapPinpoint />
      </>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
