import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Timer, InputForm} from './components';
import {SizeContextProvider, SizeContext} from './contexts';

const App = () => {
  const {dHeight, dWidth} = useContext(SizeContext);
  const [duration, setDuration] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<{
    starts: boolean;
    time?: Date;
  }>({
    starts: false,
  });
  useEffect(() => {
    SplashScreen.hide();
  });

  const styles = StyleSheet.create({
    app: {
      height: dHeight,
      width: dWidth,
      borderTopColor: '#000',
      borderTopWidth: 1,
    },
    inputForm: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    timer: {},
  });

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
      />
      <SafeAreaView>
        <KeyboardAvoidingView behavior="height">
          <View style={styles.app}>
            <SizeContextProvider>
              <InputForm
                setDuration={setDuration}
                setTimerStatus={setTimerStatus}
                style={styles.inputForm}
              />
              <Timer
                style={styles.timer}
                startDetails={timerStatus}
                durationInMin={duration}
              />
            </SizeContextProvider>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default App;
