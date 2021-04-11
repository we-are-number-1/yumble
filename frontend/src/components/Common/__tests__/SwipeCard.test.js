import React from 'react';
import renderer from 'react-test-renderer';
import SwipeCard from '../SwipeCard';

test('Swiping Card snapshot testing', () => {
  const name = 'Lonestar';
  const images= 'https://c.files.bbci.co.uk/050B/production/_103119210_lazytown2.jpg';
  const location = 'Botany';
  const price = '$$$';
  const rating = 4.0;
  const Data = {name, images, location, price, rating};

  const tree = renderer.create(<SwipeCard data = {Data}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
