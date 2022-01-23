import axios from "axios";

// Action Type
const GOT_EXPENSES = "GOT_EXPENSES";
const ADD_EXPENSE = "ADD_EXPENSE"

// Action Creator
const _gotExpenses = (expenses) => ({
  type: GOT_EXPENSES,
  expenses,
});

const _addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

// const _updateSuperhero = (superhero) => ({
//   type: UPATE_SUPERHERO,
//   superhero,
// });

// const _deleteSuperhero = (superhero) => ({
//   type: DELETE_SUPERHERO,
//   superhero,
// });



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
      const { data: newExpense } = await axios.post(
        "/api/expenses", expense
      );
      dispatch(_addExpense(newExpense));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const updateSuperhero = (superhero, history) => {
//   return async (dispatch) => {
//     try {
//       const { data: updated } = await axios.put(
//         `/api/superheroes/${superhero.id}`,
//         superhero
//       );
//       dispatch(_updateSuperhero(updated));
//       history.push("/superheroes");
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// export const deleteSuperhero = (id, history) => {
//   return async (dispatch) => {
//     try {
//       const { data: superhero } = await axios.delete(`/api/superheroes/${id}`);
//       dispatch(_deleteSuperhero(superhero));
//       history.push("/superheroes");
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// Sub-Reducer
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_EXPENSES:
      return action.expenses;
    case ADD_EXPENSE:
      return [...state, action.expense]
    // case UPATE_SUPERHERO:
    //   return state.map((superhero) =>
    //     superhero.id === action.superhero.id ? action.superhero : superhero
    //   );
    // case DELETE_SUPERHERO:
    //   return state.filter((superhero) => superhero.id !== action.superhero.id);
    default:
      return state;
  }
};