import axios from "axios";

// Action Type
const GOT_EXPENSES = "GOT_EXPENSES";
const ADD_EXPENSE = "ADD_EXPENSE";
const ADD_MONTH_YEAR = "ADD_MONTH_YEAR";
const DELETE_EXPENSE = "DELETE_EXPENSE";
const UPDATE_EXPENSE = "UPDATE_EXPENSE"

// Action Creator
const _gotExpenses = (expenses) => ({
  type: GOT_EXPENSES,
  expenses,
});

const _addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

const _addMonthYear = (expense) => ({
  type: ADD_MONTH_YEAR,
  expense,
});

const _deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

const _updateExpense = (expense) => ({
  type: UPDATE_EXPENSE,
expense,
});

// Thunks
export const fetchExpenses = () => {
  return async (dispatch) => {
    try {
      const { data: expenses } = await axios.get("/api/expenses");
      dispatch(_gotExpenses(expenses));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addExpense = (expense) => {
  return async (dispatch) => {
    try {
      console.log("** EXPENSE: ", expense)
      const { data: newExpense } = await axios.post("/api/expenses", expense);
      dispatch(_addExpense(newExpense));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateExpense = (expense, history) => {
  return async (dispatch) => {
    try {
      const { data: updatedExpense } = await axios.put(
        `/api/expenses/${expense.id}`,
        expense
      );
      dispatch(_updateExpense(updatedExpense));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteExpense = (id) => {
  return async (dispatch) => {
    try {
      const { data: expense } = await axios.delete(`/api/expenses/${id}`);
      dispatch(_deleteExpense(expense));
    } catch (err) {
      console.log(err);
    }
  };
};

// Sub-Reducer
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_EXPENSES:
      return action.expenses;
    case ADD_EXPENSE:
      return [...state, action.expense];
    // case ADD_MONTH_YEAR:
    //   return state.map((expense) =>
    //     expense.id === action.expense.id ? action.expense : expense
    //   );
    case UPDATE_EXPENSE:
      return state.map((expense) =>
        expense.id === action.expense.id ? action.expense : expense
      );
    case DELETE_EXPENSE:
      return state.filter((expense) => expense.id !== action.expense.id);
    default:
      return state;
  }
};
