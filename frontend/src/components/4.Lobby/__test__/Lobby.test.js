import React from 'react';
import renderer from 'react-test-renderer';
import Lobby from '../Lobby';
import {SocketContextProvider} from '../../../sockets/SocketContext';

jest.mock('./../../../sockets/SocketContext');
jest.mock('./../../../sockets');

test('Lobby snapshot testing', () => {
  const tree = renderer.create(
      <SocketContextProvider>
        <Lobby location={location}/>
      </SocketContextProvider>).toJSON();
  expect(tree).toMatchSnapshot();
});
