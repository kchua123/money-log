import axios from 'axios';

const SET_EXPENSE = 'SET_EXPENSE';

export const _setExpense = (expense) => {
  return {
    type: SET_EXPENSE,
    expense
  };
};

export const fetchExpense = (id) => {
  return async (dispatch) => {
    const { data: expense } = await axios.get(`/api/expenses/${id}`);
    dispatch(_setExpense(expense));
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_EXPENSE:
      return action.expense;
    default:
      return state;
  }
};