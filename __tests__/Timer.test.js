import 'react-native';
import React from 'react';
import {Timer} from '../components';
import renderer from 'react-test-renderer';

jest.mock('react-native-splash-screen', () => {
  return {
    hide: jest.fn(),
    show: jest.fn(),
  };
});

jest.useFakeTimers();

it('should match snapshot', () => {
  const snap = renderer
    .create(
      <Timer
        style={{}}
        startDetails={{starts: true, time: Math.round(Date.now() / 1000)}}
        durationInMin={1}
      />,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
