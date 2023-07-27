import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GoalForm from "./components/GoalForm";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [isModal, setIsModal] = useState(false);
  const [goals, setGoals] = useState([]);

  function showModal() {
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  function onAddGoal(enteredGoal) {
    setGoals((previousGoals) => [
      ...previousGoals,
      { text: enteredGoal, id: Math.random().toString() },
    ]);
    setIsModal(false);
  }

  function deleteGoal(id) {
    setGoals(previousGoals => {
      return previousGoals.filter(goal => goal.id !== id)
    });
  }

  return (
    <>
      <StatusBar style='light'/>
      <View style={styles.container}>
        <View style={styles.button}>
          <Button title="Add Goal" onPress={showModal}/>
        </View>
        {isModal && <GoalForm onAddGoal={onAddGoal} closeModal={closeModal}/>}
        <View style={styles.goalsContainer}>
          {/* <ScrollView>
          {goals.map((goal) => <Text style={styles.goalItem} key={goal}>{goal}</Text>)}
          </ScrollView> */}
          <FlatList
            data={goals}
            renderItem={(dataItem) => {
              return <GoalItem id={dataItem.item.id} value={dataItem.item.text} deleteGoal={deleteGoal}/>;
            }}
            alwaysBounceVertical={false}
          />
        </View>
        {/* <Text style={styles.borderItem}>
          Hello Kyro4!
        </Text>
        <StatusBar style="auto" />
        <Button title='Tap'/> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  borderItem: {
    margin: 15,
    borderWidth: 1,
    borderColor: "green",
    padding: 5,
  },
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    // justifyContent: 'center'
  },
  button: {
    width: '95%',
    borderRadius: 7,
    borderColor: 'white',
    borderWidth: 1
  },
  goalsContainer: {
    flex: 5,
    flexDirection: "column",
    width: "100%",
    paddingTop: 20
  },
});
