import { Alert } from "react-native";
import { createExpense, getExpenses, modifyExpense, removeExpense } from "../../utils/api";

const { createContext, useReducer, useEffect } = require("react");
const { DUMMY_EXPENSES } = require("../../constants/data");

export const ExpensesContext = createContext({
  expenses: [],
  loadExpenses: (paylaod) => {},
  addExpense: (paylaod) => {},
  updateExpense: (id, paylaod) => {},
  deleteExpense: (id) => {},
});

/**
 * Reducer section
 */
function expensesReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.paylaod;
    case "ADD":
      //const id = new Date().valueOf();
      //return [{ ...action.paylaod, id: id }, ...state];
      return [{ ...action.paylaod}, ...state];
    case "UPDATE":
      const expenseIndex = state.findIndex(
        (expense) => expense.id == action.paylaod.id
      );
      const foundExpense = state[expenseIndex];
      const updatedExpense = { ...foundExpense, ...action.paylaod.data };

      const expenses = [...state];
      expenses[expenseIndex] = updatedExpense;
      return expenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.paylaod);
    default:
      return state;
  }
}

/**
 * Context with Reducer
 */
function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  useEffect(() => {
    getExpenses().then((result) => {
      let expenses = [];
      result.forEach((expense, index) => {
        expenses[index] = {
          ...expense,
          ...{
            amount: parseFloat(expense.amount),
            date: new Date(expense.date)
          }
        };
      });
      dispatch({ type: "LOAD", paylaod: expenses });
    });
  }, []);

  function loadExpenses(expenses) {
    dispatch({ type: "LOAD", paylaod: expenses });
  }

  function addExpense(expense) {
    createExpense(expense)
    .then((id) => {
      if(id) {
        dispatch({ type: "ADD", paylaod: {...expense, id: id} });
      } else {
        Alert.alert('Error', 'Expense not created');
      }
    })
  }

  function updateExpense(id, expense) {
    modifyExpense(id, expense)
    .then((status) => {
      if(status) {
        dispatch({ type: "UPDATE", paylaod: { id: id, data: expense } });
      } else {
        Alert.alert('Error', 'Expense not updated');
      }
    })
  }

  function deleteExpense(id) {
    removeExpense(id)
    .then((status) => {
      if(status) {
        dispatch({ type: "DELETE", paylaod: id });
      } else {
        Alert.alert('Error', 'Expense not deleted');
      }
    })
  }

  const value = {
    expenses: expensesState,
    loadExpenses: loadExpenses,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

/**
 * Simple Context
 */
// function ExpensesContextProvider({ children }) {
//   const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

//   function addExpense({ id, title, date, amount }) {
//     setExpenses((prevExpenses) => [
//       ...prevExpenses,
//       {
//         id: id,
//         title: title,
//         date: date,
//         amount: amount,
//       },
//     ]);
//   }

//   function updateExpense(id, paylaod) {
//     setExpenses(
//       (prevExpenses) =>
//         prevExpenses.map((expense) => {
//           if(expense.id === id) {
//             return {id: id, ...paylaod}
//           } else {
//             return expense;
//           }
//         }
//     ));
//   }

//   function deleteExpense(id) {
//     setExpenses((prevExpenses) =>
//       prevExpenses.filter((expense) => expense.id !== id)
//     );
//   }

//   const value = {
//     expenses: expenses,
//     addExpense: addExpense,
//     updateExpense: updateExpense,
//     deleteExpense: deleteExpense
//   }

//   return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
// }

export default ExpensesContextProvider;
