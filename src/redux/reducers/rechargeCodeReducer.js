import {
  CREATE_RECHARGE_CODES,
  GET_ALL_RECHARGE_CODES,
  GET_RECHARGE_CODE_STATS,
  DELETE_RECHARGE_CODE,
} from "../type";

const initialState = {
  createRechargeCodes: [],
  allRechargeCodes: [],
  rechargeCodeStats: [],
  deleteRechargeCode: [],
  loading: true,
};

const rechargeCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RECHARGE_CODES:
      return {
        ...state,
        createRechargeCodes: action.payload,
        loading: false,
      };
    case GET_ALL_RECHARGE_CODES:
      return {
        ...state,
        allRechargeCodes: action.payload,
        loading: false,
      };
    case GET_RECHARGE_CODE_STATS:
      return {
        ...state,
        rechargeCodeStats: action.payload,
        loading: false,
      };
    case DELETE_RECHARGE_CODE:
      return {
        ...state,
        deleteRechargeCode: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default rechargeCodeReducer;
