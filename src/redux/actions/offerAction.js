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
import api from "../../Api/client";

// Get all offers
export const getAllOffers =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: OFFER_LOADING });
      const response = await api.getOffers(params);
      dispatch({
        type: GET_ALL_OFFERS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: OFFER_ERROR,
        payload: error.message || "حدث خطأ في تحميل العروض",
      });
    }
  };

// Get single offer
export const getOffer = (id) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_LOADING });
    const response = await api.getOffer(id);
    dispatch({
      type: GET_OFFER,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: OFFER_ERROR,
      payload: error.message || "حدث خطأ في تحميل العرض",
    });
  }
};

// Create offer
export const createOffer = (offerData) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_LOADING });
    const response = await api.createOffer(offerData);
    dispatch({
      type: CREATE_OFFER,
      payload: response,
    });
    return Promise.resolve(response);
  } catch (error) {
    const errorMessage = error.message || "حدث خطأ في إضافة العرض";
    dispatch({
      type: OFFER_ERROR,
      payload: errorMessage,
    });
    return Promise.reject(new Error(errorMessage));
  }
};

// Update offer
export const updateOffer = (id, offerData) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_LOADING });
    const response = await api.updateOffer(id, offerData);
    dispatch({
      type: UPDATE_OFFER,
      payload: response,
    });
    return Promise.resolve(response);
  } catch (error) {
    const errorMessage = error.message || "حدث خطأ في تحديث العرض";
    dispatch({
      type: OFFER_ERROR,
      payload: errorMessage,
    });
    return Promise.reject(new Error(errorMessage));
  }
};

// Delete offer
export const deleteOffer = (id) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_LOADING });
    await api.deleteOffer(id);
    dispatch({
      type: DELETE_OFFER,
      payload: id,
    });
    return Promise.resolve();
  } catch (error) {
    const errorMessage = error.message || "حدث خطأ في حذف العرض";
    dispatch({
      type: OFFER_ERROR,
      payload: errorMessage,
    });
    return Promise.reject(new Error(errorMessage));
  }
};

// Toggle offer status
export const toggleOfferStatus = (id) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_LOADING });
    const response = await api.toggleOfferStatus(id);
    dispatch({
      type: TOGGLE_OFFER_STATUS,
      payload: response,
    });
    return Promise.resolve(response);
  } catch (error) {
    const errorMessage = error.message || "حدث خطأ في تغيير حالة العرض";
    dispatch({
      type: OFFER_ERROR,
      payload: errorMessage,
    });
    return Promise.reject(new Error(errorMessage));
  }
};
