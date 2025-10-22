import {
  CREATE_SECONDARY_CATEGORY,
  GET_SECONDARY_CATEGORIES,
  GET_ERROR,
  GET_ALL_SECONDARY_CATEGORIES,
  GET_ONE_SECONDARY_CATEGORY,
  UPDATE_SECONDARY_CATEGORY,
  DELETE_SECONDARY_CATEGORY,
} from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertData } from "../../hooks/useInsertData";
import { useInsUpdateData } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";

// Create secondary category
export const createSecondaryCategory = (data) => async (dispatch) => {
  try {
    const response = await useInsertData("/api/v1/secondary-categories", data);
    dispatch({
      type: CREATE_SECONDARY_CATEGORY,
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

// Get all secondary categories (admin/public)
export const getAllSecondaryCategories =
  (query = "") =>
  async (dispatch) => {
    try {
      const qs = query ? (query.startsWith("?") ? query : `?${query}`) : "";
      const response = await useGetData(`/api/v1/secondary-categories${qs}`);
      dispatch({
        type: GET_ALL_SECONDARY_CATEGORIES,
        payload: response,
      });
    } catch (e) {
      dispatch({
        type: GET_ERROR,
        payload: "Error " + e,
      });
    }
  };

// Get secondary categories by subcategory id
export const getSecondaryCategories = (subCategoryId) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/subcategories/${subCategoryId}/secondary-categories`
    );
    dispatch({
      type: GET_SECONDARY_CATEGORIES,
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

// Get one secondary category by id
export const getOneSecondaryCategory = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/secondary-categories/${id}`);
    dispatch({
      type: GET_ONE_SECONDARY_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Update secondary category (admin/manager)
export const updateSecondaryCategory = (id, body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(
      `/api/v1/secondary-categories/${id}`,
      body
    );
    dispatch({
      type: UPDATE_SECONDARY_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

// Delete secondary category (admin)
export const deleteSecondaryCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/secondary-categories/${id}`);
    dispatch({
      type: DELETE_SECONDARY_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
