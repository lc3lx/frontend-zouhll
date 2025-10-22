import {
  GET_ERROR,
  CREATE_SECONDARY_CATEGORY,
  GET_SECONDARY_CATEGORIES,
  GET_ALL_SECONDARY_CATEGORIES,
  GET_ONE_SECONDARY_CATEGORY,
  UPDATE_SECONDARY_CATEGORY,
  DELETE_SECONDARY_CATEGORY,
} from "../type";

const initial = {
  secondaryCategories: [], // list by subcategory id
  allSecondaryCategories: [], // global list
  oneSecondaryCategory: {},
  updateSecondaryCategory: {},
  deleteSecondaryCategory: {},
  loading: true,
  error: null,
};

const secondaryCategoryReducer = (state = initial, action) => {
  switch (action.type) {
    case CREATE_SECONDARY_CATEGORY:
      return {
        ...state,
        secondaryCategories: action.payload,
        loading: false,
      };
    case GET_SECONDARY_CATEGORIES:
      return {
        ...state,
        secondaryCategories: action.payload,
        loading: false,
      };
    case GET_ALL_SECONDARY_CATEGORIES:
      return {
        ...state,
        allSecondaryCategories: action.payload,
        loading: false,
      };
    case GET_ONE_SECONDARY_CATEGORY:
      return {
        ...state,
        oneSecondaryCategory: action.payload,
        loading: false,
      };
    case UPDATE_SECONDARY_CATEGORY:
      return {
        ...state,
        updateSecondaryCategory: action.payload,
        loading: false,
      };
    case DELETE_SECONDARY_CATEGORY:
      return {
        ...state,
        deleteSecondaryCategory: action.payload,
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

export default secondaryCategoryReducer;
