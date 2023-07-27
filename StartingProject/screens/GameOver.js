import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import CustomTitle from "../components/ui/CustomTitle";
import Colors from "../constants/Colors";
import CustomButton from "../components/ui/CustomButton";
import { useState } from "react";

function GameOver(props) {
  return (
    <View style={styles.container}>
      <CustomTitle>GameOver</CustomTitle>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/success.png")} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textContent}>
            Your phone needed <Text style={styles.textHighlight}>{props.rounds.length}</Text> rounds to guess the number <Text style={styles.textHighlight}>{props.number}</Text>
        </Text>
        <CustomButton onPress={props.startGame}>Start Game</CustomButton>
      </View>
    </View>
  );
}

export default GameOver;

const deviceWith = Dimensions.get('window').width;
const imageWidth = Math.round(deviceWith-((deviceWith/100)*25));
console.log(imageWidth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  imageContainer: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth/2,
    borderWidth: 3,
    borderColor: Colors.themeGreyLight,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 42
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7
  },
  textContent: {
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    paddingVertical: 10
  },
  textHighlight: {
    fontWeight: 'bold',
    fontSize: 25,
    color: Colors.themeYellow
  }
});
