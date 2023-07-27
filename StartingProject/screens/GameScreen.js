import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import CustomButton from "../components/ui/CustomButton";
import CustomTitle from "../components/ui/CustomTitle";
import { useEffect, useState } from "react";
import GameNumber from "../components/ui/GameNumber";
import Card from "../components/ui/Card";
import { Ionicons } from "@expo/vector-icons";

function generateRandomNumber(min, max, exclude) {
  let number = Math.ceil(Math.random() * (max - min)) + min;
  if (number === exclude) {
    number = generateRandomNumber(1, 99, exclude);
  }
  return number;
}

let minNum = 1;
let maxNum = 99;

function GameScreen(props) {
  const randomNumber = generateRandomNumber(minNum, maxNum, props.number);
  const [gameNumber, setGameNumber] = useState(randomNumber);
  const [existingRound, setExistingRound] = useState([]);

  let listRef = null;

  //console.log(props.number, "=>", gameNumber);

  useEffect(() => {
    minNum = 1;
    maxNum = 99;
    setExistingRound([]);
  }, []);

  useEffect(() => {
    if (props.number === gameNumber) {
      props.gameOver();
    }
  }, [props.number, gameNumber, props.gameOver]);

  function regenerateNumber(type) {
    if (type == "up") {
      minNum = gameNumber + 1;
      maxNum = 99;
    } else {
      minNum = 1;
      maxNum = gameNumber - 1;
    }

    if (minNum >= maxNum) {
      // if(minNum != maxNum) {
      //     const tempNum = maxNum;
      //     maxNum = minNum;
      //     minNum = tempNum;
      // } else {
      Alert.alert("Error", "Invalid Game Number");
      return;
      //}
    }
    const newNumber = generateRandomNumber(minNum, maxNum, gameNumber);
    
    if(props.rounds.indexOf(newNumber) > -1) {
      if(!existingRound.indexOf(newNumber)) {
        setExistingRound((prevRounds) => [...prevRounds, newNumber]);
        regenerateNumber(type);
        return;
      } else {
        //Alert.alert('Notice', 'Already attempted');
        return;
      }
    }

    setGameNumber(newNumber);
    props.updateRounds(newNumber);
    if(listRef) {
      listRef.scrollToEnd({animate: true});
    }
  }

  function cheatGameOver() {
    setGameNumber(props.number);
  }

  function restart() {
    props.restart();
  }

  return (
    <View style={styles.container}>
      <CustomTitle>Opponent's Guess</CustomTitle>
      <Card>
        <GameNumber>{gameNumber}</GameNumber>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <CustomButton onPress={regenerateNumber.bind(this, "down")}>
              <Ionicons name="md-remove" size={25} />
            </CustomButton>
          </View>
          <View style={styles.button}>
            <CustomButton onPress={regenerateNumber.bind(this, "up")}>
              <Ionicons name="md-add" size={25} />
            </CustomButton>
          </View>
        </View>
        {/* <CustomButton onPress={cheatGameOver}>
          Cheat Game Over
        </CustomButton> */}
      </Card>
      <CustomButton onPress={restart}>Restart</CustomButton>
      { props.rounds.length > 0 &&
      <View style={styles.listContainer}>
        <FlatList
          data={props.rounds}
          renderItem={(itemData) => (
            <Text style={styles.listItem}>
              #{itemData.index+1} {itemData.item}
            </Text>
          )}
          inverted={true}
          keyExtractor={(item) => item + Math.random()}
          alwaysBounceVertical={false}
          ref={(ref) => {
            listRef = ref;
          }}
        />
      </View>
      }
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 42,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    width: "55%",
  },
  listContainer: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'stretch',
    //width: '95%',
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 2,
    //flexDirection: "column",
    backgroundColor: "black",
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 15,
    //paddingVertical: 25,
    maxHeight: '35%'
  },
  listItem: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    borderBottomColor: '#949494',
    borderBottomWidth: 1
    //justifyContent: 'space-between',
    //width: '100%',
    //flex: 1
  },
});
