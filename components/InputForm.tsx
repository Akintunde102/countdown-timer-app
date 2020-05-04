import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
  Keyboard,
  Alert,
  Dimensions
} from 'react-native';


const {fontScale} = Dimensions.get('window');


const InputForm = ({
  setDuration,
  setTimerStatus,
  style,
}: {
  setDuration: Function;
  setTimerStatus: Function;
  style: ViewStyle;
}) => {
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
    setTimerStatus({starts: true, time: Math.round(Date.now()/1000)});
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

const styles = StyleSheet.create({
  view: {
    width: '70%',
    height: '10%'
  },
  inputView: {
    borderColor: '#000',
    borderWidth: 2,
    flex: 3,
    height: '100%',
    padding: '1%',
    marginLeft: '2%',
    marginRight: '2%'
  },
  input: {
    flex: 3,
    height: '100%',
    padding: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    fontSize: 12,
    color: '#777776',
  },
  textView: {
    padding: '1%',
    paddingRight: '0%',
    flex: 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 12 / fontScale,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#62bfac',
    flex: 2.5,
  },
  buttonText: {
    padding: '15%',
    paddingLeft: '14%',
    paddingRight: '10%',
    color: '#fff',
  },
});

export default InputForm;
