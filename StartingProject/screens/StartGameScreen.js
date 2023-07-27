import { TextInput, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import CustomButton from "../components/ui/CustomButton";
import { useState } from "react";
import Colors from "../constants/Colors";
import CustomTitle from "../components/ui/CustomTitle";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";

function StartGameScreen(props) {
  const [enteredNumber, setNumber] = useState('');

  const {width, height} = useWindowDimensions();
  //console.log(width, height);

  console.log(Platform.OS);

  function resetHandler() {
    setNumber('');  
  }

  function numberInputHandler(number) {
    setNumber(number);
  }

  function submitHandler() {
    const number = parseInt(enteredNumber);
    if(isNaN(number) || number <= 0 || number > 99) {
        Alert.alert('Invalid Number!', 'Not a valid number', [
            {
                text: 'Okay',
                style: 'destructive',
                onPress: resetHandler
            }
        ]);
        return;
    }
    props.forwardNumber(number);
  }

  let paddingTop = 30;
  if(width > 400) {
    paddingTop = 10;
  }

  return (
    <ScrollView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="position">
        <View style={[styles.rootContainer, {paddingTop: paddingTop}]}>
          <CustomTitle>Guess Number</CustomTitle>
          <Card>
            <View style={styles.container}>
              <Title>Enter a Number</Title>
              <TextInput
                style={styles.input}
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={numberInputHandler}
                value={enteredNumber}
              />
            </View>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <CustomButton onPress={resetHandler}>Reset</CustomButton>
              </View>
              <View style={styles.button}>
                <CustomButton onPress={submitHandler}>Confirm</CustomButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: 30
  },
  container: {
    alignItems: 'center'
  },
  input: {
    width: "50%",
    padding: Platform.select({ios: 5, android: 5}),
    margin: 7,
    borderBottomColor: Colors.themeYellow,
    borderBottomWidth: 1,
    color: Colors.themeYellow,
    fontFamily: 'open-sans-bold',
    fontSize: 30,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
