import axios from "axios";

// Action Type
const GOT_MONTHS_YEARS = "GOT_MONTHS_YEARS"
const ADD_MONTH_YEAR = "ADD_MONTH_YEAR";

// Action Creator
const _gotMonthsYears = (months) => ({
  type: GOT_MONTHS_YEARS,
  months,
});
const _addMonthYear = (months) => ({
  type: ADD_MONTH_YEAR,
  months,
});

// Thunks
export const fetchMonthsYears = () => {
  return async (dispatch) => {
    try {
      const { data: monthsYears } = await axios.get("/api/dates");
      dispatch(_gotMonthsYears(monthsYears));
    } catch (err) {
      console.log(err);
    }
  };
};
export const addMonthsYears = (month) => {
  return async (dispatch) => {
    try {
      console.log("** MONTH/YEAR: ", month)
      const { data: newMonthYear } = await axios.post("/api/dates", month);
      dispatch(_addMonthYear(newMonthYear));
    } catch (err) {
      console.log(err);
    }
  };
};

// Sub-Reducer
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_MONTHS_YEARS:
      return action.months;
    case ADD_MONTH_YEAR:
      let monthMatch = state.filter(element => element.month === action.month.month && element.year === action.month.year);
      if(monthMatch.length === 0){
        return [...state, action.month]}
    return state;
    default:
      return state;
  }
};
