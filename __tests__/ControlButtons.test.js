import 'react-native';
import React from 'react';
import {ControlButtons} from '../components';
import renderer from 'react-test-renderer';

const setDelay = jest.fn();
const customStyle = {};

it('should match snapshot', () => {
  const snap = renderer
    .create(
      <ControlButtons
        delay={1000}
        setDelay={setDelay}
        customStyle={customStyle}
      />,
    )
    .toJSON();
  expect(snap).toMatchSnapshot();
});
