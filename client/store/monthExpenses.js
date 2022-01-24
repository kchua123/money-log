import axios from "axios";

// Action Type
const GOT_MONTH_EXPENSES = "GOT_MONTH_EXPENSES";

// Action Creator
const _gotMonthExpenses = (expenses) => ({
  type: GOT_MONTH_EXPENSES,
  expenses,
});

// Thunks
export const fetchMonthExpenses = (year, month) => {
  return async (dispatch) => {
    try {
      const { data: expenses } = await axios.get(`/api/expenses/${year}/${month}`);
      dispatch(_gotMonthExpenses(expenses));
    } catch (err) {
      console.log(err);
    }
  };
};

// Sub-Reducer
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_MONTH_EXPENSES:
      return action.expenses;
    default:
      return state;
  }
};