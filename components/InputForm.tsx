import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
  Keyboard,
  Alert,
} from 'react-native';
import {SizeContext} from '../contexts';

const InputForm = ({
  setDuration,
  setTimerStatus,
  style,
}: {
  setDuration: Function;
  setTimerStatus: Function;
  style: ViewStyle;
}) => {
  const {fontScale, dHeight} = useContext(SizeContext);
  const styles = StyleSheet.create({
    view: {
      flexDirection: 'row',
      height: dHeight * 0.08,
      backgroundColor: '#ffc',
    },
    textView: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center',
    },
    text: {
      fontSize: 18 / fontScale,
      textAlign: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      fontWeight: '700',
    },
    inputView: {
      flex: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
    },
    input: {
      fontSize: 24 / fontScale,
      color: '#62bfac',
      textAlign: 'center',
      fontStyle: 'normal',
    },
    button: {
      backgroundColor: '#62bfac',
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 25 / fontScale,
    },
  });

  const [durationInput, setDurationInput] = useState<string>('0');
  const onChangeText = (text: string) => {
    setDurationInput(text);
  };

  const handleSubmit = () => {
    const inputAsNumber = parseInt(durationInput, 10);
    if (!/^-?[0-9]+$/.test(durationInput)) {
      Alert.alert('Bad Input', 'Only Positive Whole Numbers Are Allowed');
      return;
    }
    setDuration(inputAsNumber);
    setTimerStatus({starts: true, time: Math.round(Date.now() / 1000)});
    Keyboard.dismiss();
  };

  return (
    <View style={{...style, ...styles.view}}>
      <View style={styles.textView}>
        <Text style={styles.text}>CountDown:</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="(Min)"
          placeholderTextColor="#777776"
          onChangeText={onChangeText}
          onSubmitEditing={() => Keyboard.dismiss()}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit();
        }}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};



export default InputForm;
