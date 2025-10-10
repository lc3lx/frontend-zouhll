import {
  GET_ALL_ORDER,
  UPDATE_ORDER_DELIVER,
  GET_ONE_ORDER,
  UPDATE_ORDER_PAY,
  GET_PENDING_SHAMCASH_PAYMENTS,
  APPROVE_SHAMCASH_PAYMENT,
  REJECT_SHAMCASH_PAYMENT,
} from "../type";

import { useGetDataToken } from "../../hooks/useGetData";
import { useInsUpdateData } from "../../hooks/useUpdateData";

export const getAllOrders = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/orders?limit=${limit}&page=${page}`
    );
    dispatch({
      type: GET_ALL_ORDER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_ORDER,
      payload: e.response,
    });
  }
};

export const getOneOrders = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/orders/${id}`);

    dispatch({
      type: GET_ONE_ORDER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ONE_ORDER,
      payload: e.response,
    });
  }
};

export const changeOrderPay = (id) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/orders/${id}/pay`);

    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: e.response,
    });
  }
};

export const changeOrderDeliver = (id) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/orders/${id}/deliver`);

    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: e.response,
    });
  }
};

// Get pending ShamCash payments
export const getPendingShamCashPayments = () => async (dispatch) => {
  try {
    const response = await useGetDataToken("/api/v1/orders/shamcash/pending");

    dispatch({
      type: GET_PENDING_SHAMCASH_PAYMENTS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_PENDING_SHAMCASH_PAYMENTS,
      payload: e.response,
    });
  }
};

// Approve ShamCash payment
export const approveShamCashPayment =
  (orderId, adminNotes) => async (dispatch) => {
    try {
      const response = await useInsUpdateData(
        `/api/v1/orders/${orderId}/approve-payment`,
        {
          adminNotes,
        }
      );

      dispatch({
        type: APPROVE_SHAMCASH_PAYMENT,
        payload: response,
      });

      return response;
    } catch (e) {
      dispatch({
        type: APPROVE_SHAMCASH_PAYMENT,
        payload: e.response,
      });
      return e.response;
    }
  };

// Reject ShamCash payment
export const rejectShamCashPayment =
  (orderId, adminNotes) => async (dispatch) => {
    try {
      const response = await useInsUpdateData(
        `/api/v1/orders/${orderId}/reject-payment`,
        {
          adminNotes,
        }
      );

      dispatch({
        type: REJECT_SHAMCASH_PAYMENT,
        payload: response,
      });

      return response;
    } catch (e) {
      dispatch({
        type: REJECT_SHAMCASH_PAYMENT,
        payload: e.response,
      });
      return e.response;
    }
  };
