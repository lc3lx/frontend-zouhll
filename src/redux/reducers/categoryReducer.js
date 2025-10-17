import {
  GET_ALL_CATEGORY,
  GET_ONE_CATEGORY,
  GET_ERROR,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "../type";

const inital = {
  category: [],
  oneCategory: [],
  loading: true,
  error: null,
};
const categoryReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case GET_ONE_CATEGORY:
      return {
        ...state,
        oneCategory: action.payload,
        loading: false,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default categoryReducer;
