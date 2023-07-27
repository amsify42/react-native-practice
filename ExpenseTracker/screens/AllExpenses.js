import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "../components/ExpensesList";
import { useContext } from "react";
import { ExpensesContext } from "../store/context/ExpensesContext";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  return (
    <View style={styles.container}>
        <ExpensesList expenses={expensesContext.expenses} daysAgo="7"/>
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
