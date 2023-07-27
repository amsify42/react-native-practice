import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import { ImageBackground } from "react-native";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/Colors";
import GameOver from "./screens/GameOver";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";

export default function App() {
  const [enteredNumber, setEnteredNumber] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [rounds, setRounds] = useState([]);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  }

  function updateRounds(number) {
    setRounds((prevRounds) => [...prevRounds, number]);
  }

  function restartGame() {
    setIsGameOver(false);
    setEnteredNumber('');
    setRounds([]);
  }

  function setNumber(number) {
    setEnteredNumber(number);
  }

  function gameOver() {
    setIsGameOver(true);
  }

  let screen = <StartGameScreen forwardNumber={setNumber}/>;
  if(enteredNumber) {
    screen = <GameScreen number={enteredNumber} rounds={rounds} updateRounds={updateRounds} restart={restartGame} gameOver={gameOver}/>
  }

  if(isGameOver && enteredNumber) {
    screen = <GameOver startGame={restartGame} number={enteredNumber} rounds={rounds}/>;
  }

  return (
    <>
      <StatusBar style="light"/>
      <LinearGradient colors={[Colors.themeYellow, Colors.themeGreyLight]} style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        resizeMode="cover"
        style={styles.container}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: '#f7ed2b',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  backgroundImage: {
    opacity: 0.15
  }
});
