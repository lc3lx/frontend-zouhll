import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";
import storeReducer from "./storeReducer";
import subcategoryReducer from "./subcategoryReducer";
import secondaryCategoryReducer from "./secondaryCategoryReducer";
import productsReducer from "./productsReducer";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";
import addToWishListReducer from "./wishListReducer";
import couponReducer from "./couponReducer";
import userAddressesReducer from "./userAddressesReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import orderReducer from "./orderReducer";
import walletReducer from "./walletReducer";
import rechargeCodeReducer from "./rechargeCodeReducer";
import exchangeRateReducer from "./exchangeRateReducer";
import offerReducer from "./offerReducer";
export default combineReducers({
  allCategory: categoryReducer,
  allBrand: brandReducer,
  allStore: storeReducer,
  subCategory: subcategoryReducer,
  secondaryCategory: secondaryCategoryReducer,
  allproducts: productsReducer,
  authReducer: authReducer,
  reviewReducer: reviewReducer,
  addToWishListReducer: addToWishListReducer,
  couponReducer: couponReducer,
  userAddressesReducer: userAddressesReducer,
  cartReducer: cartReducer,
  checkoutReducer: checkoutReducer,
  orderReducer: orderReducer,
  walletReducer: walletReducer,
  rechargeCodeReducer: rechargeCodeReducer,
  exchangeRateReducer: exchangeRateReducer,
  offers: offerReducer,
});
