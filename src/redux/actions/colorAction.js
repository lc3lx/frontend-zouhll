import {
  GET_ALL_COLORS,
  GET_ONE_COLOR,
  CREATE_COLOR,
  UPDATE_COLOR,
  DELETE_COLOR,
  GET_COLORS_BY_CATEGORY,
  GET_ERROR,
} from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";
import { useInsUpdateData } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";

// Get all colors
export const getAllColors = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/colors${limit ? `?limit=${limit}` : ""}`
    );
    dispatch({
      type: GET_ALL_COLORS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get one color
export const getOneColor = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/colors/${id}`);
    dispatch({
      type: GET_ONE_COLOR,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Create color
export const createColor = (formData) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/colors`, formData);
    dispatch({
      type: CREATE_COLOR,
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

// Update color
export const updateColor = (id, formData) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/colors/${id}`, formData);
    dispatch({
      type: UPDATE_COLOR,
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

// Delete color
export const deleteColor = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/colors/${id}`);
    dispatch({
      type: DELETE_COLOR,
      payload: response,
    });
    // Refresh colors list after deletion
    dispatch(getAllColors());
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Get colors by category
export const getColorsByCategory = (categoryId) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/colors/category/${categoryId}`);
    dispatch({
      type: GET_COLORS_BY_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
