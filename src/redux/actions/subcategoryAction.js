import { 
  CREATE_SUB_CATEGORY, 
  GET_SUB_CATEGORY, 
  GET_ERROR,
  GET_ALL_SUBCATEGORIES,
  GET_ONE_SUBCATEGORY,
  UPDATE_SUB_CATEGORY,
  DELETE_SUB_CATEGORY
} from '../type'
import { useGetData } from '../../hooks/useGetData'
import { useInsertData } from '../../hooks/useInsertData'
import { useInsUpdateData } from '../../hooks/useUpdateData'
import useDeleteData from '../../hooks/useDeleteData'

//gcreate sub category with pagination
export const createSubCategory = (data) => async (dispatch) => {
    try {
        const response = await useInsertData("/api/v1/subcategories", data);
        dispatch({
            type: CREATE_SUB_CATEGORY,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
};

// get all subcategories (admin/public)
export const getAllSubcategories = (query = '') => async (dispatch) => {
  try {
    const qs = query ? (query.startsWith('?') ? query : `?${query}`) : '';
    const response = await useGetData(`/api/v1/subcategories${qs}`);
    dispatch({
      type: GET_ALL_SUBCATEGORIES,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

// get one subcategory by id
export const getOneSubcategory = (id) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/subcategories/${id}`);
    dispatch({
      type: GET_ONE_SUBCATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

// update subcategory (admin/manager)
export const updateSubCategory = (id, body) => async (dispatch) => {
  try {
    const response = await useInsUpdateData(`/api/v1/subcategories/${id}`, body);
    dispatch({
      type: UPDATE_SUB_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

// delete subcategory (admin)
export const deleteSubCategory = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/subcategories/${id}`);
    dispatch({
      type: DELETE_SUB_CATEGORY,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: 'Error ' + e,
    });
  }
};

//get sub category depend in cat id
export const getOneCategory = (id) => async (dispatch) => {
    try {
        const response = await useGetData(`/api/v1/categories/${id}/subcategories`);

        dispatch({
            type: GET_SUB_CATEGORY,
            payload: response,
            loading: true
        })

    } catch (e) {
        dispatch({
            type: GET_ERROR,
            payload: "Error " + e,
        })
    }
}