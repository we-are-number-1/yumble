import React from 'react';
import renderer from 'react-test-renderer';
import Help from '../Help';

test('Location Helper snapshot testing with on/off trigger on', () => {
  const component1 = renderer.create(
      <>
        <Help trigger={true}/>
      </>,
  );

  const tree1 = component1.toJSON();
  expect(tree1).toMatchSnapshot();
});

test('Location Helper snapshot testing with on/off trigger off', () => {
  const component2 = renderer.create(
      <>
        <Help trigger={false}/>
      </>,
  );

  const tree2 = component2.toJSON();
  expect(tree2).toMatchSnapshot();
});

