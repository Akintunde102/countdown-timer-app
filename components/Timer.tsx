import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useInterval} from '../utils';

const convertSecondsToMins = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  return {
    minutes,
    seconds,
  };
};

const {fontScale} = Dimensions.get('window');

const Timer = ({
  durationInMin,
  starts,
  style,
}: {
  durationInMin: number;
  starts: boolean;
  style: ViewStyle;
}) => {
  //const presentTime = Math.floor(Date.now() / 1000);
  const durationInSecs = durationInMin * 60;
  const [secsLeft, setSecsLeft] = useState<number>(durationInSecs);
  const [delay, setDelay] = useState<number>(1000);
  const {minutes, seconds} = convertSecondsToMins(secsLeft);
  const [pause, setPause] = useState<boolean>(false);

  console.log({durationInSecs, secsLeft, starts});

  useEffect(() => {
    setSecsLeft(durationInMin * 60);
  }, [durationInMin]);

  useInterval(
    () => {
      if (starts) {
        setSecsLeft(secsLeft - 1);
      }
    },
    pause ? null : delay,
  );

  return (
    <View style={{...styles.wholeView, ...style}}>
      <Text style={styles.tagText}> More than Half Way There</Text>
      <View style={styles.mainView}>
        <View style={styles.mainViewText}>
          <Text style={styles.timerText}>
            {minutes}:{seconds}
          </Text>
        </View>
        <View style={styles.mainViewIcon}>
          <Icon.Button
            style={styles.icon}
            name="pause-circle-outline"
            color=""
            size={400}
            solid
            onPress={() => {
              setPause(!pause);
            }}
          />
        </View>
      </View>
      {/**
       * <Button
        onPress={() => {
          setDelay(1000);
        }}
        title="1X"
        color="#62bfac"
      />
      <Button
        onPress={() => {
          setDelay(666.67);
        }}
        title="1.5X"
        color="#62bfac"
      />

      <Button
        onPress={() => {
          setDelay(500);
        }}
        title="2X"
        color="#62bfac"
      />

      <Button
        onPress={() => {
          setPause(!pause);
        }}
        title="Pause"
        color="#62bfac"
      />
       */}
    </View>
  );
};

const styles = StyleSheet.create({
  wholeView: {},
  mainView: {
    margin: 0,
    borderColor: 'red',
    borderWidth: 3,
    padding: 0,
    flexDirection: 'row',
  },
  mainViewText: {
    borderColor: 'red',
    borderWidth: 3,
    flex: 5,
  },
  mainViewIcon: {
    borderColor: 'red',
    borderWidth: 3,
    flex: 1.5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 100 / fontScale,
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    width: '100%',
    padding: 0,
    color: '#000',
    backgroundColor: 'blue',
  },
  tagText: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 18,
    fontStyle: 'italic',
    color: '#000',
  },
  icon: {
    fontSize: 65 / fontScale,
    color: '#000',
  },
});

export default Timer;
