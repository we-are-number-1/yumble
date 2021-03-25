import React from 'react';
import renderer from 'react-test-renderer';
import UserInput from '../UserInput';

it('User Input snapshot testing', () => {
  const component1 = renderer.create(
      <>
        <UserInput inputType={'preferences'} />
      </>,
  );

  const tree1 = component1.toJSON();
  expect(tree1).toMatchSnapshot();

  const component2 = renderer.create(
      <>
        <UserInput inputType={'JoinGroup'} />
      </>,
  );
  const tree2 = component2.toJSON();
  expect(tree2).toMatchSnapshot();
});
