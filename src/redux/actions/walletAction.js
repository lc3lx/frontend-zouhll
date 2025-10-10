import {
  GET_USER_WALLET,
  CREATE_USER_WALLET,
  RECHARGE_WALLET,
  GET_WALLET_TRANSACTIONS,
  CHECK_WALLET_BALANCE,
  CREATE_ORDER_WALLET,
} from "../type";
import { useGetDataToken } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";

// Get user wallet
export const getUserWallet = () => async (dispatch) => {
  try {
    const response = await useGetDataToken("/api/v1/wallet");
    dispatch({
      type: GET_USER_WALLET,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_USER_WALLET,
      payload: e.response,
    });
  }
};

// Create user wallet
export const createUserWallet = () => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/wallet/create");
    dispatch({
      type: CREATE_USER_WALLET,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CREATE_USER_WALLET,
      payload: e.response,
    });
  }
};

// Recharge wallet using code
export const rechargeWallet = (code) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/wallet/recharge", { code });
    dispatch({
      type: RECHARGE_WALLET,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: RECHARGE_WALLET,
      payload: e.response,
    });
  }
};

// Get wallet transactions
export const getWalletTransactions =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      const response = await useGetDataToken(
        `/api/v1/wallet/transactions?page=${page}&limit=${limit}`
      );
      dispatch({
        type: GET_WALLET_TRANSACTIONS,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: GET_WALLET_TRANSACTIONS,
        payload: e.response,
      });
    }
  };

// Check wallet balance
export const checkWalletBalance = () => async (dispatch) => {
  try {
    const response = await useGetDataToken("/api/v1/wallet/balance");
    dispatch({
      type: CHECK_WALLET_BALANCE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CHECK_WALLET_BALANCE,
      payload: e.response,
    });
  }
};

// Create order with wallet payment
export const createOrderWallet = (cartId, body) => async (dispatch) => {
  try {
    const response = await useInsertData(
      `/api/v1/orders/wallet/${cartId}`,
      body
    );
    dispatch({
      type: CREATE_ORDER_WALLET,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_WALLET,
      payload: e.response,
    });
  }
};
