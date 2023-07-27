import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { isDateDaysAgo } from "../utils/date";
import { GlobalStyles } from "../constants/styles";

function renderExpense(itemData) {
  return <ExpenseItem expense={itemData.item} />;
}

function ExpensesList({ expenses, daysAgo }) {
  let totalAmount = 0;
  if(daysAgo) {
    expenses = expenses.filter((expense) =>
      (expense.date && isDateDaysAgo(expense.date, daysAgo))
    );
  }
  totalAmount = expenses.reduce((total, { amount }) => total + amount, 0);
  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        {!daysAgo && <Text style={styles.title}>Recent</Text>}
        {daysAgo && <Text style={styles.title}>Last {daysAgo} Days</Text>}
        <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text>
      </View>
      <FlatList
        data={expenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overview: {
    width: "100%",
    //backgroundColor: 'white',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    //marginVertical: 5,
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
    borderColor: GlobalStyles.colors.primary200,
    borderBottomWidth: 1,
  },
  title: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 20,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
    fontSize: 20,
  },
});
