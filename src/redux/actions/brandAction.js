import { GET_ALL_BRAND, GET_ONE_BRAND, GET_ERROR, CREATE_BRAND, UPDATE_BRAND } from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertDataWithImage } from "../../hooks/useInsertData";
import { useInUpdateDataWithImage } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";

//get all Brand
export const getAllBrand = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands?limit=${limit}`);

    dispatch({
      type: GET_ALL_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get one Brand
export const getOneBrand = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands/${id}`);

    dispatch({
      type: GET_ONE_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get all Brand with pagination
export const getAllBrandPage = (page) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands?limit=4&page=${page}`);
    dispatch({
      type: GET_ALL_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//insert brand with pagination
export const createBrand = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/brands`, formData);
    dispatch({
      type: CREATE_BRAND,
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

//update brand
export const updateBrand = (id, formData) => async (dispatch) => {
  try {
    const response = await useInUpdateDataWithImage(
      `/api/v1/brands/${id}`,
      formData
    );
    dispatch({
      type: UPDATE_BRAND,
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

//delete brand
export const deleteBrand = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/brands/${id}`);
    dispatch({
      type: GET_ALL_BRAND,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};
