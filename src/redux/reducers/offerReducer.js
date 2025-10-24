import {
  GET_ALL_OFFERS,
  GET_OFFER,
  CREATE_OFFER,
  UPDATE_OFFER,
  DELETE_OFFER,
  TOGGLE_OFFER_STATUS,
  OFFER_LOADING,
  OFFER_ERROR,
} from "../types/offerTypes";

const initialState = {
  offers: null,
  offer: null,
  loading: false,
  error: null,
};

const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_OFFERS:
      return {
        ...state,
        offers: action.payload,
        loading: false,
        error: null,
      };

    case GET_OFFER:
      return {
        ...state,
        offer: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_OFFER:
      return {
        ...state,
        offers: {
          ...state.offers,
          data: [action.payload, ...(state.offers?.data || [])],
        },
        loading: false,
        error: null,
      };

    case UPDATE_OFFER:
      return {
        ...state,
        offers: {
          ...state.offers,
          data:
            state.offers?.data?.map((offer) =>
              offer._id === action.payload._id ? action.payload : offer
            ) || [],
        },
        offer: action.payload,
        loading: false,
        error: null,
      };

    case DELETE_OFFER:
      return {
        ...state,
        offers: {
          ...state.offers,
          data:
            state.offers?.data?.filter(
              (offer) => offer._id !== action.payload
            ) || [],
        },
        loading: false,
        error: null,
      };

    case TOGGLE_OFFER_STATUS:
      return {
        ...state,
        offers: {
          ...state.offers,
          data:
            state.offers?.data?.map((offer) =>
              offer._id === action.payload._id ? action.payload : offer
            ) || [],
        },
        loading: false,
        error: null,
      };

    case OFFER_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case OFFER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default offerReducer;
