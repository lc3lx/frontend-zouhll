import {
  GET_ALL_STORE,
  GET_ONE_STORE,
  GET_ERROR,
  CREATE_STORE,
  UPDATE_STORE,
} from "../type";

const inital = {
  store: [],
  oneStore: [],
  loading: true,
};

const storeReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_STORE:
      return {
        ...state,
        store: action.payload,
        loading: false,
      };
    case GET_ONE_STORE:
      return {
        ...state,
        oneStore: action.payload,
        loading: false,
      };
    case CREATE_STORE:
      return {
        store: action.payload,
        loading: false,
      };
    case UPDATE_STORE:
      return {
        store: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return {
        store: action.payload,
        loading: true,
      };
    default:
      return state;
  }
};

export default storeReducer;

