import {
  GET_ALL_EXCHANGE_RATES,
  GET_ONE_EXCHANGE_RATE,
  CREATE_EXCHANGE_RATE,
  UPDATE_EXCHANGE_RATE,
  DELETE_EXCHANGE_RATE,
  GET_CURRENT_EXCHANGE_RATE,
  CONVERT_PRICE,
  GET_ERROR,
} from "../type";

const initial = {
  exchangeRates: [],
  exchangeRate: {},
  currentExchangeRate: {},
  convertedPrice: {},
  loading: true,
};

const exchangeRateReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ALL_EXCHANGE_RATES:
      return {
        ...state,
        exchangeRates: action.payload,
        loading: false,
      };
    case GET_ONE_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload,
        loading: false,
      };
    case GET_CURRENT_EXCHANGE_RATE:
      return {
        ...state,
        currentExchangeRate: action.payload,
        loading: false,
      };
    case CONVERT_PRICE:
      return {
        ...state,
        convertedPrice: action.payload,
        loading: false,
      };
    case CREATE_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload,
        loading: false,
      };
    case UPDATE_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload,
        loading: false,
      };
    case DELETE_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRate: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return {
        ...state,
        loading: true,
        exchangeRates: action.payload,
      };
    default:
      return state;
  }
};

export default exchangeRateReducer;
