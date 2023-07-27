import { Text, StyleSheet, Pressable } from "react-native";

function GoalItem(props) {
  return (
    <Pressable
      onPress={props.deleteGoal.bind(this, props.id)}
      android_ripple={{ color: "#eeeeee" }}
    >
      <Text style={styles.goalItem}>{props.value}</Text>
    </Pressable>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    color: "blue",
    fontWeight: "bold",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 3,
    borderRadius: 4,
  }
});
