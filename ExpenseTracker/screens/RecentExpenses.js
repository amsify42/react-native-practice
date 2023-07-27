import { StyleSheet, Text, View } from "react-native";
import ExpensesList from "../components/ExpensesList";
import { useContext, useEffect } from "react";
import { ExpensesContext } from "../store/context/ExpensesContext";
import { ActivityIndicator } from "react-native";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  
  if(!expensesCtx.expenses.length) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={42} color="blue"/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <ExpensesList expenses={expensesCtx.expenses} daysAgo=""/>
    </View>
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  loader: {
    flex: 1
  },  
  container: {
      flex: 1
  }
});
