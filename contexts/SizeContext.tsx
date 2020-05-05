import React, {createContext} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const size = {
  dHeight: hp('100%'),
  dWidth: wp('100%'),
  fontScale: 360 / wp('100%'),
};

export const SizeContext = createContext(size);

const SizeContextProvider = (props: any) => {
  return (
    <SizeContext.Provider value={size}>{props.children}</SizeContext.Provider>
  );
};

export default SizeContextProvider;
