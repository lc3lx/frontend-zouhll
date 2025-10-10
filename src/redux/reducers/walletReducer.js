import {
  GET_USER_WALLET,
  CREATE_USER_WALLET,
  RECHARGE_WALLET,
  GET_WALLET_TRANSACTIONS,
  CHECK_WALLET_BALANCE,
  CREATE_ORDER_WALLET,
} from "../type";

const initialState = {
  userWallet: [],
  createWallet: [],
  rechargeWallet: [],
  walletTransactions: [],
  walletBalance: [],
  createOrderWallet: [],
  loading: true,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_WALLET:
      return {
        ...state,
        userWallet: action.payload,
        loading: false,
      };
    case CREATE_USER_WALLET:
      return {
        ...state,
        createWallet: action.payload,
        loading: false,
      };
    case RECHARGE_WALLET:
      return {
        ...state,
        rechargeWallet: action.payload,
        loading: false,
      };
    case GET_WALLET_TRANSACTIONS:
      return {
        ...state,
        walletTransactions: action.payload,
        loading: false,
      };
    case CHECK_WALLET_BALANCE:
      return {
        ...state,
        walletBalance: action.payload,
        loading: false,
      };
    case CREATE_ORDER_WALLET:
      return {
        ...state,
        createOrderWallet: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default walletReducer;
