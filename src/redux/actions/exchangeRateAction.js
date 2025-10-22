import { useGetDataToken } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";
import { useInsUpdateData } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";
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

// Get all exchange rates
export const getAllExchangeRates = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/exchange-rates`);
    dispatch({
      type: GET_ALL_EXCHANGE_RATES,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get one exchange rate
export const getOneExchangeRate = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/exchange-rates/${id}`);
    dispatch({
      type: GET_ONE_EXCHANGE_RATE,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get current exchange rate
export const getCurrentExchangeRate =
  (from = "USD", to = "SYP") =>
  async (dispatch) => {
    try {
      const response = await useGetDataToken(
        `/api/v1/exchange-rates/current?from=${from}&to=${to}`
      );
      dispatch({
        type: GET_CURRENT_EXCHANGE_RATE,
        payload: response,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
      });
    }
  };

// Convert price
export const convertPrice =
  (amount, from = "USD", to = "SYP") =>
  async (dispatch) => {
    try {
      const response = await useGetDataToken(
        `/api/v1/exchange-rates/convert?amount=${amount}&from=${from}&to=${to}`
      );
      dispatch({
        type: CONVERT_PRICE,
        payload: response,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
      });
    }
  };

// Create exchange rate
export const createExchangeRate = (formData) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/exchange-rates`, formData);
    dispatch({
      type: CREATE_EXCHANGE_RATE,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Update exchange rate
export const updateExchangeRate = (id, formData) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(
      `/api/v1/exchange-rates/${id}`,
      formData
    );
    dispatch({
      type: UPDATE_EXCHANGE_RATE,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Delete exchange rate
export const deleteExchangeRate = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/exchange-rates/${id}`);
    dispatch({
      type: DELETE_EXCHANGE_RATE,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
