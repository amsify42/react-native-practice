import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { formatDate } from "../utils/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ expense }) {
  const navigation = useNavigation();

  function editHandler() {
    navigation.navigate('ManageExpense', {
      id: expense.id
    })
  }

  return (
    <Pressable onPress={editHandler}>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>{expense.title}</Text>
          <Text style={styles.date}>
            {formatDate(expense.date)}
          </Text>
        </View>
        <View style={styles.amountArea}>
          <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GlobalStyles.colors.primary500,
    padding: 7,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: GlobalStyles.colors.primary100 
  },
  info: {

  },
  title: {
    color: GlobalStyles.colors.primary50,
    fontWeight: 'bold',
    fontSize: 17
  },
  date: {
    color: GlobalStyles.colors.primary50,
    fontWeight: 'bold'
  },
  amountArea: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
    backgroundColor: 'white',
    borderRadius: 7
  },
  amount: {
    color: GlobalStyles.colors.primary700,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
