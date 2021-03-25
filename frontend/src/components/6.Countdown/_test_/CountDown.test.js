import React from 'react';
import renderer from 'react-test-renderer';
import CountDown from '../CountDown';
import {SocketContextProvider} from '../../../sockets/SocketContext';

jest.mock('./../../../sockets/SocketContext');
jest.mock('./../../../sockets');

test('CountDown snapshot testing', () => {
  const tree = renderer.create(<SocketContextProvider>
    <CountDown location={location}/>
  </SocketContextProvider>).toJSON();
  expect(tree).toMatchSnapshot();
});
