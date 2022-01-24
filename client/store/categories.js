import axios from "axios";

// Action Type
const GOT_CATEGORIES = "GOT_CATEGORIES";

// Action Creator
const _gotCategories = (categories) => ({
  type: GOT_CATEGORIES,
  categories,
});

// const _addExpense = (expense) => ({
//   type: ADD_EXPENSE,
//   expense,
// });


// Thunks
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const { data: categories } = await axios.get("/api/categories");
      dispatch(_gotCategories(categories));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const addExpense = (expense) => {
//   return async (dispatch) => {
//     try {
//       console.log("** EXPENSE: ", expense)
//       const { data: newExpense } = await axios.post("/api/expenses", expense);
//       dispatch(_addExpense(newExpense));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

// Sub-Reducer
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};
