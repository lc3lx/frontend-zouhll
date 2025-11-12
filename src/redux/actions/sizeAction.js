import {
  GET_ALL_SIZES,
  GET_ONE_SIZE,
  CREATE_SIZE,
  UPDATE_SIZE,
  DELETE_SIZE,
  GET_SIZES_BY_CATEGORY,
  GET_SIZES_BY_TYPE,
  GET_ERROR,
} from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";
import { useInsUpdateData } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";

// Get all sizes
export const getAllSizes = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/sizes${limit ? `?limit=${limit}` : ""}`
    );
    dispatch({
      type: GET_ALL_SIZES,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get one size
export const getOneSize = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/sizes/${id}`);
    dispatch({
      type: GET_ONE_SIZE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Create size
export const createSize = (formData) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/sizes`, formData);
    dispatch({
      type: CREATE_SIZE,
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

// Update size
export const updateSize = (id, formData) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/sizes/${id}`, formData);
    dispatch({
      type: UPDATE_SIZE,
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

// Delete size
export const deleteSize = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/sizes/${id}`);
    dispatch({
      type: DELETE_SIZE,
      payload: response,
    });
    // Refresh sizes list after deletion
    dispatch(getAllSizes());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get sizes by category
export const getSizesByCategory = (categoryId) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/sizes/category/${categoryId}`);
    dispatch({
      type: GET_SIZES_BY_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get sizes by type
export const getSizesByType = (type) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/sizes/type/${type}`);
    dispatch({
      type: GET_SIZES_BY_TYPE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
