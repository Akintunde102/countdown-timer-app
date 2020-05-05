import 'react-native';
import React from 'react';
import {InputForm} from '../components';
import renderer from 'react-test-renderer';

const setDuration = jest.fn();
const setTimerStatus = jest.fn();
const style = {};

it('should match snapshot', () => {
  const snap = renderer
    .create(
      <InputForm
        setDuration={setDuration}
        setTimerStatus={setTimerStatus}
        style={style}
      />,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
