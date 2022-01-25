import axios from "axios";

// Action Type
const GOT_CATEGORIES = "GOT_CATEGORIES";
const ADD_CATEGORY = "ADD_CATEGORY";

// Action Creator
const _gotCategories = (categories) => ({
  type: GOT_CATEGORIES,
  categories,
});

const _addCategory = (category) => ({
  type: ADD_CATEGORY,
  category
});

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

export const addCategory = (category) => {
  return async (dispatch) => {
    try {
      console.log("REACHED THE ADDCATEGORY THUNK!!!")
      console.log("ADDCATEGORY THUNK, CATEGORY: ", category)
      const { data: newCategory } = await axios.post("/api/categories", category);
      console.log(newCategory)
      dispatch(_addCategory(newCategory));
    } catch (err) {
      console.log(err);
    }
  };
};

// Sub-Reducer
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return action.categories;
      case ADD_CATEGORY:
      return [...state, action.category];
    default:
      return state;
  }
};
