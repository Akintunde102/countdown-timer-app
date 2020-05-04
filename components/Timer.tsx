import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';

import {useInterval} from '../utils';
import ControlButton from './ControlButton';

const convertSecondsToMins = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  return {
    minutes: minutes >= 100 ? minutes : ('0' + minutes).slice(-2),
    seconds: ('0' + seconds).slice(-2),
  };
};

let ping = new Sound('ping.mp3', Sound.MAIN_BUNDLE, (error: string) => {
  if (error) {
    console.log(error);
  }
});

console.log({v: ping.getVolume()});

const {fontScale} = Dimensions.get('window');

const Timer = ({
  durationInMin,
  startDetails,
  style,
}: {
  durationInMin: number;
  startDetails: {starts: boolean; time?: Date};
  style: ViewStyle;
}) => {
  const durationInSecs = durationInMin * 60;
  const [secsLeft, setSecsLeft] = useState<number>(durationInSecs);
  const [delay, setDelay] = useState<number>(1000);
  const {minutes, seconds} = convertSecondsToMins(secsLeft);
  const [pause, setPause] = useState<boolean>(true);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  const {starts: shouldTimerStart, time: initializationTime} = startDetails;

  useEffect(() => {
    if (shouldTimerStart) {
      setSecsLeft(durationInSecs);
      if (pause) {
        setPause(false);
      }
    }
  }, [durationInSecs, initializationTime]);

  useInterval(
    () => {
      if (shouldTimerStart) {
        if (secsLeft <= 1) {
          setPause(true);
        }
        setSecsLeft(secsLeft - 1);
      }
    },
    pause ? null : delay,
  );

  useInterval(() => {
    if (secsLeft <= 10 && secsLeft !== 0) {
      setShowTimer(!showTimer);
      console.log({secsLeft2: secsLeft});
      ping.play(success => {
        console.log({secsLeft});
        if (!success) {
          console.log('Sound did not play');
        }
      });
    }
    if (secsLeft === 0) {
      setShowTimer(true);
    }
  }, delay / 2);

  return (
    <View style={{...styles.wholeView, ...style}}>
      <View style={styles.tagTextView}>
        {shouldTimerStart && !pause && secsLeft < durationInSecs / 2 ? (
          <Text style={styles.tagText}> More than halfway there!</Text>
        ) : (
          shouldTimerStart &&
          secsLeft <= 0 && <Text style={styles.tagText}> Time's Up </Text>
        )}
      </View>
      <View style={styles.mainView}>
        <View style={styles.mainViewText}>
          <Text
            style={{
              ...styles.timerText,
              ...(secsLeft >= 6000
                ? {
                    fontSize: 80 / fontScale,
                  }
                : {
                    fontSize: 100 / fontScale,
                  }),
              ...(shouldTimerStart && secsLeft <= 20 && secsLeft !== 0
                ? {
                    color: 'red',
                  }
                : {
                    color: '#000',
                  }),
              ...(showTimer
                ? {}
                : {
                    display: 'none',
                  }),
            }}>
            {minutes}:{seconds}
          </Text>
        </View>
        <View style={styles.mainViewIcon}>
          <TouchableOpacity
            onPress={() => {
              if (secsLeft <= 0) {
                setSecsLeft(durationInSecs);
              }
              setPause(!pause);
            }}>
            {pause ? (
              <Icon
                style={styles.icon}
                name="play-circle-outline"
                color="#000"
                size={60 / fontScale}
              />
            ) : (
              <Icon
                style={styles.icon}
                name="pause-circle-outline"
                color="#000"
                size={60 / fontScale}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.controlButtons}>
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
    </View>
  );
};

const constantStyles = {
  controlButton: {
    borderColor: '#000',
    borderWidth: 3,
    margin: '5%',
    marginRight: '3%',
    marginLeft: '0%',
    width: '24%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
};

const styles = StyleSheet.create({
  wholeView: {},
  mainView: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    height: '40%',
  },
  mainViewText: {
    width: '100%',
    flex: 6,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainViewIcon: {
    flex: 1.5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
    padding: 0,
  },
  timerText: {
    fontFamily: 'uFont',
    textAlign: 'center',
  },
  tagText: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
    color: '#000',
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
  tagTextView: {
    height: '20%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
  },
  icon: {},
  controlButtonUnclicked: {
    ...constantStyles.controlButton,
  },
  controlButtons: {
    flexDirection: 'row',
    marginLeft: '10%',
    width: '80%',
  },
  controlButtonClicked: {
    ...constantStyles.controlButton,
    backgroundColor: '#6c6c6c',
  },
  controlButtonText: {
    fontWeight: '700',
    color: '#fff',
  },
  controlButtonTextClicked: {
    fontWeight: '700',
    color: '#000',
  },
});

export default Timer;
