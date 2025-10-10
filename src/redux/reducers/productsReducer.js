import {
  DELETE_PRODUCTS,
  GET_ALL_PRODUCTS_BRAND,
  GET_ALL_PRODUCTS_CATEGORY,
  UPDATE_PRODUCTS,
  CREATE_PRODUCTS,
  GET_PRODUCT_LIKE,
  GET_PRODUCT_DETALIS,
  GET_ALL_PRODUCTS,
  GET_HOME_PRODUCTS,
  GET_ERROR,
} from "../type";

const inital = {
  products: [],
  allProducts: [],
  homeProducts: [],
  oneProduct: [],
  productLike: [],
  deleteProducts: [],
  updateProducts: [],
  allProductCat: [],
  allProductBrand: [],
  loading: true,
  homeLoading: true,
};
const productsReducer = (state = inital, action) => {
  console.log(
    "productsReducer - Action:",
    action.type,
    "Payload:",
    action.payload,
    "Loading:",
    action.loading
  );
  console.log("productsReducer - Current State:", state);

  switch (action.type) {
    case CREATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_ALL_PRODUCTS:
      console.log(
        "productsReducer - GET_ALL_PRODUCTS - setting loading to false"
      );
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
      };
    case GET_HOME_PRODUCTS:
      console.log(
        "productsReducer - GET_HOME_PRODUCTS - setting homeLoading to false"
      );
      return {
        ...state,
        homeProducts: action.payload,
        homeLoading: false,
      };
    case GET_PRODUCT_DETALIS:
      return {
        ...state,
        oneProduct: action.payload,
        loading: false,
      };
    case GET_PRODUCT_LIKE:
      return {
        ...state,
        productLike: action.payload,
        loading: false,
      };
    case DELETE_PRODUCTS:
      return {
        ...state,
        deleteProducts: action.payload,
        loading: false,
      };
    case UPDATE_PRODUCTS:
      return {
        ...state,
        updateProducts: action.payload,
        loading: false,
      };
    case GET_ERROR:
      console.log(
        "productsReducer - GET_ERROR - keeping loading state unchanged"
      );
      return {
        ...state,
        products: action.payload,
      };
    case GET_ALL_PRODUCTS_CATEGORY:
      console.log(
        "productsReducer - GET_ALL_PRODUCTS_CATEGORY - keeping loading state unchanged"
      );
      return {
        ...state,
        allProductCat: action.payload,
      };
    case GET_ALL_PRODUCTS_BRAND:
      console.log(
        "productsReducer - GET_ALL_PRODUCTS_BRAND - keeping loading state unchanged"
      );
      return {
        ...state,
        allProductBrand: action.payload,
      };

    default:
      return state;
  }
};
export default productsReducer;
