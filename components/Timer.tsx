import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';

import {useInterval} from '../utils';
import ControlButtons from './ControlButtons';
import {SizeContext} from '../contexts';

const convertSecondsToMins = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  const timeObj = {
    minutes: minutes >= 100 ? minutes : ('0' + minutes).slice(-2),
    seconds: ('0' + seconds).slice(-2),
  };
  const formattedDisplay = `${timeObj.minutes}:${timeObj.seconds}`;
  const digitNumber = formattedDisplay.toString().length;
  return {
    ...timeObj,
    formattedDisplay,
    digitNumber,
  };
};

let ping = new Sound('ping.mp3', Sound.MAIN_BUNDLE, (error: string) => {
  if (error) {
    console.log(error);
  }
});

const Timer = ({
  durationInMin,
  startDetails,
  style,
}: {
  durationInMin: number;
  startDetails: {starts: boolean; time?: Date};
  style: ViewStyle;
}) => {
  const {fontScale, dHeight, dWidth} = useContext(SizeContext);

  const durationInSecs = durationInMin * 60;
  const [secsLeft, setSecsLeft] = useState<number>(durationInSecs);
  const [delay, setDelay] = useState<number>(1000);
  const {formattedDisplay, digitNumber} = convertSecondsToMins(secsLeft);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const styles = StyleSheet.create({
    wholeView: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: '#ffc',
    },
    mainView: {
      flex: 1,
      flexDirection: 'column',
      marginTop: dHeight * 0.2,
      marginBottom: dHeight * 0.01,
      marginLeft: dWidth * 0.02,
      marginRight: dWidth * 0.02,
    },
    tagTextView: {
      flex: 0.1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: dWidth * 0.10,
    },
    tagText: {
      fontSize: 20/fontScale,
      color: '#000',
      fontWeight: '700',
    },
    mainViewTimer: {
      flex: 0.4,
      flexDirection: 'row',
    },
    mainViewText: {
      flex: 6,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainViewIcon: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: dWidth * 0.05,
      padding: 0,
    },
    timerText: {
      fontFamily: 'uFont',
      textAlign: 'center',
      fontSize: 580 / digitNumber / fontScale,
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
    },
    icon: {},
    controlButtons: {
      flex: 0.2,
      flexDirection: 'row',
      borderTopWidth: 10,
      borderRadius: 2,
      borderColor: '#ddd',
      justifyContent: 'center',
    },
  });

  return (
    <View style={{...styles.wholeView, ...style}}>
      <View style={styles.mainView}>
        <View style={styles.tagTextView}>
          {shouldTimerStart && !pause && secsLeft < durationInSecs / 2 ? (
            <Text style={styles.tagText}> More than halfway there!</Text>
          ) : (
            shouldTimerStart &&
            secsLeft <= 0 && <Text style={styles.tagText}> Time's Up </Text>
          )}
        </View>
        <View style={styles.mainViewTimer}>
          <View style={styles.mainViewText}>
            <Text style={styles.timerText}>{formattedDisplay}</Text>
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
                  size={45 / fontScale}
                />
              ) : (
                <Icon
                  style={styles.icon}
                  name="pause-circle-outline"
                  color="#000"
                  size={45 / fontScale}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ControlButtons
        customStyle={styles.controlButtons}
        delay={delay}
        setDelay={(d: number) => {
          setDelay(d);
        }}
      />
    </View>
  );
};

export default Timer;
