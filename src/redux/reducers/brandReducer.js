import { GET_ALL_BRAND, GET_ONE_BRAND, GET_ERROR, CREATE_BRAND, UPDATE_BRAND } from "../type";

const inital = {
  brand: [],
  oneBrand: [],
  loading: true,
};
const brandReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_BRAND:
      return {
        ...state,
        brand: action.payload,
        loading: false,
      };
    case GET_ONE_BRAND:
      return {
        ...state,
        oneBrand: action.payload,
        loading: false,
      };
    case CREATE_BRAND:
      return {
        ...state,
        brand: action.payload,
        loading: false,
      };
    case UPDATE_BRAND:
      return {
        ...state,
        brand: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return {
        ...state,
        loading: true,
        brand: action.payload,
      };
    default:
      return state;
  }
};
export default brandReducer;
