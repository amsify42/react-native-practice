import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Button from "../components/ui/Button";
import { ExpensesContext } from "../store/context/ExpensesContext";
import Input from "../components/ui/Input";

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const isEdit = route.params.id ? true : false;
  const [expense, setExpense] = useState({
    id: "",
    title: "",
    date: "",
    amount: "",
  });
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isEdit && !isTouched) {
      const expenseFound = expensesCtx.expenses.find(
        (expense) => expense.id === route.params.id
      );
      if (expenseFound) {
        setExpense(expenseFound);
      }
    }
  }, [expense, isTouched]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: (isEdit ? "Modify" : "Create") + " Expense",
    });
  }, [navigation, isEdit, expense]);

  function saveHandler() {
    if(!expense.title || expense.amount <= 0 || !expense.date) {
      Alert.alert('Error', 'Please enter valid inputs');
      return;
    }
    if (isEdit) {
      expensesCtx.updateExpense(route.params.id, expense);
    } else {
      expensesCtx.addExpense(expense);
    }
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function deleteHandler() {
    Alert.alert(
      "Alert",
      "Are you sure want to delete?", // <- this part is optional, you can pass an empty string
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => {
            if (isEdit) {
              expensesCtx.deleteExpense(route.params.id);
            }
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  }

  function inputChangeHandler(field, value) {
    setIsTouched(true);
    if (field == "date" && value.length < 10) {
      return;
    }
    setExpense((prevExpense) => {
      return {
        ...prevExpense,
        [field]:
          field == "date"
            ? new Date(value)
            : field == "amount"
            ? parseFloat(value)
            : value,
      };
    });
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.buttons}>
        <Icon icon="close" color="white" size={20} onPress={cancelHandler}/>
      </View> */}
      <View style={styles.formRow}>
        <Input
          label="Title"
          textInputConfig={{
            placeholder: "Name",
            defaultValue: expense.title ? expense.title.toString() : "",
            onChangeText: inputChangeHandler.bind(this, "title"),
          }}
        />
      </View>
      <View style={styles.formRow}>
        <Input
          label="Amount"
          textInputConfig={{
            placeholder: "0.00",
            defaultValue: expense.amount ? expense.amount.toString() : "",
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            defaultValue: expense.date ? expense.date.toISOString() : "",
            onChangeText: inputChangeHandler.bind(this, "date"),
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          title="Remove"
          color="white"
          size={20}
          onPress={deleteHandler}
        />
        <Button title="Save" color="white" size={20} onPress={saveHandler} />
      </View>
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  formRow: {
    flexDirection: "row",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsBottom: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
});
