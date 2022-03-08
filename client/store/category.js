import axios from 'axios';

const GET_CATEGORY = 'GET_CATEGORY';

export const _getCategory = (category) => {
  return {
    type: GET_CATEGORY,
    category
  };
};

export const fetchCategory = (id) => {
  return async (dispatch) => {
    const { data: category } = await axios.get(`/api/categories/${id}`);
    dispatch(_getCategory(category));
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return action.category;
    default:
      return state;
  }
};