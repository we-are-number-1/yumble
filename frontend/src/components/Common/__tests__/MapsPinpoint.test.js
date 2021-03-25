import React from 'react';
import renderer from 'react-test-renderer';
import MapPinpoint from '../MapsPinpoint';

it('Maps Pinpoint snapshot testing', () => {
  const component1 = renderer.create(
      <>
        <MapPinpoint />
      </>,
  );

  const tree1 = component1.toJSON();
  expect(tree1).toMatchSnapshot();

});
