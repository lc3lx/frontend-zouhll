import {
  GET_ALL_CATEGORY,
  GET_ERROR,
  GET_ONE_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertDataWithImage } from "../../hooks/useInsertData";
import { useInUpdateDataWithImage } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";
//get all category
export const getAllCategory = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/categories?limit=${limit}`);

    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get one category with
export const getOneCategory = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/categories/${id}`);

    dispatch({
      type: GET_ONE_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get all category with pagination
export const getAllCategoryPage = (page) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/categories?limit=6&page=${page}`
    );
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get all category with pagination
export const createCategory = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(
      `/api/v1/categories`,
      formData
    );
    dispatch({
      type: CREATE_CATEGORY,
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

//update category
export const updateCategory = (id, formData) => async (dispatch) => {
  try {
    const response = await useInUpdateDataWithImage(
      `/api/v1/categories/${id}`,
      formData
    );
    dispatch({
      type: UPDATE_CATEGORY,
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

//delete category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/categories/${id}`);
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
