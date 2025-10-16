import { 
  GET_ERROR, 
  GET_SUB_CATEGORY, 
  CREATE_SUB_CATEGORY,
  GET_ALL_SUBCATEGORIES,
  GET_ONE_SUBCATEGORY,
  UPDATE_SUB_CATEGORY,
  DELETE_SUB_CATEGORY
} from "../type";

const inital = {
  subcategory: [], // list by category id
  subcategories: [], // global list
  oneSubcategory: {},
  updateSubcategory: {},
  deleteSubcategory: {},
  loading: true,
};
const subcategoryReducer = (state = inital, action) => {
  switch (action.type) {
    case CREATE_SUB_CATEGORY:
      return {
        ...state,
        subcategory: action.payload,
        loading: false,
      };
    case GET_SUB_CATEGORY:
      return {
        ...state,
        subcategory: action.payload,
        loading: false,
      };
    case GET_ALL_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload,
        loading: false,
      };
    case GET_ONE_SUBCATEGORY:
      return {
        ...state,
        oneSubcategory: action.payload,
        loading: false,
      };
    case UPDATE_SUB_CATEGORY:
      return {
        ...state,
        updateSubcategory: action.payload,
        loading: false,
      };
    case DELETE_SUB_CATEGORY:
      return {
        ...state,
        deleteSubcategory: action.payload,
        loading: false,
      };
    case GET_ERROR:
      return {
        ...state,
        loading: true,
        subcategory: action.payload,
      };
    default:
      return state;
  }
};
export default subcategoryReducer;
