/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Timer, InputForm} from './components';

const App = () => {
  const [duration, setDuration] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<{starts: boolean}>({
    starts: false,
  });
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <>
      <StatusBar barStyle="light-content" hidden={true} />
      <SafeAreaView>
        <View style={styles.app}>
          <InputForm
            setDuration={setDuration}
            setTimerStatus={setTimerStatus}
            style={styles.inputForm}
          />
          <Timer
            style={styles.timer}
            starts={timerStatus.starts}
            durationInMin={duration}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    width: '100%',
    padding: '7%',
  },
  textInput: {
    width: '50%',
    fontSize: 20,
  },
  inputForm: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginRight: '5%',
  },
  timer: {},
});

export default App;
