import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Player} from '@react-native-community/audio-toolkit';
import {useInterval, FormatTimeForDisplay} from '../utils';
import ControlButtons from './ControlButtons';
import {SizeContext} from '../contexts';

const Timer = ({
  durationInMin,
  startDetails,
  style,
}: {
  durationInMin: number;
  startDetails: {starts: boolean; time?: Date};
  style: ViewStyle;
}) => {
  // Convert Duration To Seconds
  const durationInSecs = durationInMin * 60;

  // Contexts
  const {fontScale, dHeight, dWidth} = useContext(SizeContext);

  // States
  const [secsLeft, setSecsLeft] = useState<number>(durationInSecs);
  const [delay, setDelay] = useState<number>(1000);
  const {formattedDisplay, digitNumber} = FormatTimeForDisplay(secsLeft);
  const [pause, setPause] = useState<boolean>(true);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [tagText, setTagText] = useState<string>('');
  const {starts: shouldTimerStart, time: initializationTime} = startDetails;

  // To Restart Timer If User Clicks Play Again
  useEffect(() => {
    if (shouldTimerStart) {
      setSecsLeft(durationInSecs);
      setTagText('');
      if (pause) {
        setPause(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationInSecs, initializationTime]);

  // An Intelligent Wrapper for UseEffect and SetInterval, controls the timer ticks
  // and watches for operations tide to the Timer ticks
  useInterval(
    () => {
      if (shouldTimerStart) {
        if (!pause && secsLeft <= durationInSecs / 2 + 1) {
          setTagText('More than halfway there!');
        }

        if (secsLeft <= 1) {
          setTagText("Time's Up");
          setPause(true);
        }

        setSecsLeft(secsLeft - 1);
      }
    },
    pause ? null : delay,
  );

  // This Watches for only for Blink And Sound Effects
  // 'cause blink and sound effects needs their own 'smart" interval delays
  useInterval(() => {
    if (!pause && secsLeft <= 10 && secsLeft !== 0) {
      setShowTimer(!showTimer);

      new Player('ping.mp3').play().on('ended', () => {
        console.log('Sound Played');
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
      marginRight: dWidth * 0.1,
    },
    tagText: {
      fontSize: 20 / fontScale,
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
          <Text style={styles.tagText}> {tagText} </Text>
        </View>
        <View style={styles.mainViewTimer}>
          <View style={styles.mainViewText}>
            <Text style={styles.timerText}>{formattedDisplay}</Text>
          </View>
          <View style={styles.mainViewIcon}>
            <TouchableOpacity
              onPress={() => {
                if (secsLeft <= 0) {
                  setTagText('');
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
