import {
  GET_ALL_SIZES,
  GET_ONE_SIZE,
  CREATE_SIZE,
  UPDATE_SIZE,
  DELETE_SIZE,
  GET_SIZES_BY_CATEGORY,
  GET_SIZES_BY_TYPE,
  GET_ERROR,
} from "../type";

const initial = {
  sizes: [],
  oneSize: [],
  sizesByCategory: [],
  sizesByType: [],
  loading: true,
  error: null,
};

const sizeReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ALL_SIZES:
      return {
        ...state,
        sizes: action.payload,
        loading: false,
      };
    case GET_ONE_SIZE:
      return {
        ...state,
        oneSize: action.payload,
        loading: false,
      };
    case CREATE_SIZE:
      return {
        ...state,
        sizes: action.payload,
        loading: false,
      };
    case UPDATE_SIZE:
      return {
        ...state,
        sizes: action.payload,
        loading: false,
      };
    case DELETE_SIZE:
      return {
        ...state,
        sizes: action.payload,
        loading: false,
      };
    case GET_SIZES_BY_CATEGORY:
      return {
        ...state,
        sizesByCategory: action.payload,
        loading: false,
      };
    case GET_SIZES_BY_TYPE:
      return {
        ...state,
        sizesByType: action.payload,
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

export default sizeReducer;
