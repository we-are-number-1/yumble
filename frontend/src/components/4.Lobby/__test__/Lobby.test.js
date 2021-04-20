import React from 'react';
import renderer from 'react-test-renderer';
import Lobby from '../Lobby';
import { SocketContextProvider } from '../../../sockets/SocketContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('./../../../sockets/SocketContext');
jest.mock('./../../../sockets');

test('Lobby snapshot testing', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <SocketContextProvider>
          <Lobby location={location} />
        </SocketContextProvider>
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
