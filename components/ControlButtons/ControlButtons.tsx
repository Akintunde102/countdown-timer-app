import React, {useContext} from 'react';
import {StyleSheet, View, Text, TextStyle, ViewStyle} from 'react-native';
import ControlButton from './ControlButton';
import {SizeContext} from '../../contexts';

const ControlButtons = ({
  delay,
  setDelay,
  customStyle,
}: {
  delay: number;
  setDelay: Function;
  customStyle: ViewStyle;
}) => {
  // Contexts
  const {fontScale, dHeight, dWidth} = useContext(SizeContext);

  const constantStyles = {
    borderColor: '#000',
    borderWidth: 3,
    marginTop: dHeight * 0.02,
    marginBottom: dHeight * 0.03,
    marginRight: dWidth * 0.03,
    marginLeft: 0,
    width: dWidth * 0.24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: dWidth * 0.03,
    paddingRight: dWidth * 0.03,
    paddingTop: dHeight * 0.03,
    paddingBottom: dHeight * 0.03,
  } as TextStyle;

  const styles = StyleSheet.create({
    controlButtonUnclicked: {
      ...constantStyles,
    },
    controlButtonClicked: {
      ...constantStyles,
      backgroundColor: '#6c6c6c',
    },
    controlButtonText: {
      fontWeight: '700',
      color: '#fff',
      fontSize: 20 / fontScale,
    },
    controlButtonTextClicked: {
      fontWeight: '700',
      color: '#000',
      fontSize: 20 / fontScale,
    },
  });

  return (
    <View style={customStyle}>
      <ControlButton
        action={() => {
          setDelay(1000);
        }}
        customStyle={
          delay === 1000
            ? styles.controlButtonClicked
            : styles.controlButtonUnclicked
        }>
        <Text
          style={
            delay === 1000
              ? styles.controlButtonText
              : styles.controlButtonTextClicked
          }>
          1X
        </Text>
      </ControlButton>
      <ControlButton
        action={() => {
          setDelay(666.67);
        }}
        customStyle={
          delay === 666.67
            ? styles.controlButtonClicked
            : styles.controlButtonUnclicked
        }>
        <Text
          style={
            delay === 666.67
              ? styles.controlButtonText
              : styles.controlButtonTextClicked
          }>
          1.5X
        </Text>
      </ControlButton>
      <ControlButton
        action={() => {
          setDelay(500);
        }}
        customStyle={
          delay === 500
            ? styles.controlButtonClicked
            : styles.controlButtonUnclicked
        }>
        <Text
          style={
            delay === 500
              ? styles.controlButtonText
              : styles.controlButtonTextClicked
          }>
          2X
        </Text>
      </ControlButton>
    </View>
  );
};

export default ControlButtons;
