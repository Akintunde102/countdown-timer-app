import 'react-native';
import React from 'react';
import App from '../App.tsx';
import renderer from 'react-test-renderer';

jest.mock('react-native-splash-screen', () => {
  return {
    hide: jest.fn(),
    show: jest.fn(),
  };
});

jest.useFakeTimers();

it('App Snapshot', () => {
  const snap = renderer.create(<App />).toJSON();
  expect(snap).toMatchSnapshot();
});
