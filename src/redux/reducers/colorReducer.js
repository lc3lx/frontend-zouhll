import {
  GET_ALL_COLORS,
  GET_ONE_COLOR,
  CREATE_COLOR,
  UPDATE_COLOR,
  DELETE_COLOR,
  GET_COLORS_BY_CATEGORY,
  GET_ERROR,
} from "../type";

const initial = {
  colors: [],
  oneColor: [],
  colorsByCategory: [],
  loading: true,
  error: null,
};

const colorReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ALL_COLORS:
      return {
        ...state,
        colors: action.payload,
        loading: false,
      };
    case GET_ONE_COLOR:
      return {
        ...state,
        oneColor: action.payload,
        loading: false,
      };
    case CREATE_COLOR:
      return {
        ...state,
        colors: action.payload,
        loading: false,
      };
    case UPDATE_COLOR:
      return {
        ...state,
        colors: action.payload,
        loading: false,
      };
    case DELETE_COLOR:
      return {
        ...state,
        colors: action.payload,
        loading: false,
      };
    case GET_COLORS_BY_CATEGORY:
      return {
        ...state,
        colorsByCategory: action.payload,
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

export default colorReducer;
