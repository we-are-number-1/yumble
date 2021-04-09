import React from 'react';
import renderer from 'react-test-renderer';
import SwipingPage from '../SwipingPage';
import {SocketContextProvider} from '../../../sockets/SocketContext';

jest.mock('./../../../sockets/SocketContext');
jest.mock('./../../../sockets');

test('Swiping page', () => {
  const Data =[{
    name: 'Lonestar',
    coords: 'lat: -36.9685858, lng: 174.8595453',
    images: 'https://c.files.bbci.co.uk/050B/production/_103119210_lazytown2.jpg',
    location: 'Botany',
    cuisine: 'European',
    price: '$$$',
    rating: 4.0,
  }];

  const location={Location};
  location.state = [Data];
  const tree = renderer.create(
      <SocketContextProvider>
        <SwipingPage
          location = {location}/>
      </SocketContextProvider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
