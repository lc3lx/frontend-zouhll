import {
  CREATE_RECHARGE_CODES,
  GET_ALL_RECHARGE_CODES,
  GET_RECHARGE_CODE_STATS,
  DELETE_RECHARGE_CODE,
} from "../type";
import { useGetDataToken } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";
import useDeleteData from "../../hooks/useDeleteData";

// Create recharge codes (Admin)
export const createRechargeCodes = (body) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/recharge-codes", body);
    dispatch({
      type: CREATE_RECHARGE_CODES,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: CREATE_RECHARGE_CODES,
      payload: e.response,
    });
  }
};

// Get all recharge codes (Admin)
export const getAllRechargeCodes =
  (query = "") =>
  async (dispatch) => {
    try {
      const response = await useGetDataToken(`/api/v1/recharge-codes${query}`);
      dispatch({
        type: GET_ALL_RECHARGE_CODES,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: GET_ALL_RECHARGE_CODES,
        payload: e.response,
      });
    }
  };

// Get recharge code statistics (Admin)
export const getRechargeCodeStats = () => async (dispatch) => {
  try {
    const response = await useGetDataToken("/api/v1/recharge-codes/stats");
    dispatch({
      type: GET_RECHARGE_CODE_STATS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_RECHARGE_CODE_STATS,
      payload: e.response,
    });
  }
};

// Delete recharge code (Admin)
export const deleteRechargeCode = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/recharge-codes/${id}`);
    dispatch({
      type: DELETE_RECHARGE_CODE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: DELETE_RECHARGE_CODE,
      payload: e.response,
    });
  }
};
