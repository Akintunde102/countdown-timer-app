import React, {ReactChild} from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

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

export default ControlButton;
