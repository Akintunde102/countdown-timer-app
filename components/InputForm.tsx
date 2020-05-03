import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

const InputForm = ({
  setDuration,
  setTimerStatus,
  style
}: {
  setDuration: Function;
  setTimerStatus: Function;
  style: ViewStyle
}) => {
  const [durationInput, setDurationInput] = useState<number>(0);
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
          onChangeText={(text: string) => {
            setDurationInput(parseInt(text, 10));
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDuration(durationInput);
          setTimerStatus({starts: true});
        }}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
  },
  inputView: {
    borderColor: '#000',
    borderWidth: 2,
    flex: 3,
    height: '100%',
    padding: '1%',
    marginLeft: '2%',
    marginRight: '2%',
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
    borderColor: 'yellow',
    borderWidth: 3,
    flex: 3,
  },
  text: {
    fontSize: 17,
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
    paddingTop: '12%',
    paddingLeft: '20%',
    paddingRight: '20%',
    color: '#fff',
    textAlign: 'center',
  },
});

export default InputForm;
