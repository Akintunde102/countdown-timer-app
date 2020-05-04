import React, {ReactChild} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';

const ControlButton = ({
  action,
  customStyle,
  children,
}: {
  action: Function;
  customStyle: ViewStyle;
  children: ReactChild;
}) => {
  return (
    <TouchableOpacity
      style={{...customStyle}}
      onPress={() => {
        action();
      }}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {},
});

export default ControlButton;
