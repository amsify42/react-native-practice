import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/Colors";

function GameNumber({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{children}</Text>
    </View>
  );
}

export default GameNumber;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'center'
  },
  content: {
    textAlign: 'center',
    borderColor: Colors.themeYellow,
    color: Colors.themeYellow,
    borderWidth: 1,
    fontFamily: 'open-sans-bold',
    fontSize: 35,
    width: '70%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5
  },
});
