import { GET_ALL_STORE, GET_ONE_STORE, GET_ERROR, CREATE_STORE, UPDATE_STORE } from "../type";
import { useGetData } from "../../hooks/useGetData";
import { useInsertDataWithImage } from "../../hooks/useInsertData";
import { useInUpdateDataWithImage } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";

//get all Store
export const getAllStore = (limit) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/stores?limit=${limit || 1000}`);

    dispatch({
      type: GET_ALL_STORE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get one Store
export const getOneStore = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/stores/${id}`);

    dispatch({
      type: GET_ONE_STORE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//get all Store with pagination
export const getAllStorePage = (page) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/stores?limit=4&page=${page}`);
    dispatch({
      type: GET_ALL_STORE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

//insert store with pagination
export const createStore = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/stores`, formData);
    dispatch({
      type: CREATE_STORE,
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

//update store
export const updateStore = (id, formData) => async (dispatch) => {
  try {
    const response = await useInUpdateDataWithImage(
      `/api/v1/stores/${id}`,
      formData
    );
    dispatch({
      type: UPDATE_STORE,
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

//delete store
export const deleteStore = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/stores/${id}`);
    dispatch({
      type: GET_ALL_STORE,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error " + e,
    });
  }
};

