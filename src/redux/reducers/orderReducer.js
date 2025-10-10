import {
  GET_ALL_ORDER,
  UPDATE_ORDER_DELIVER,
  UPDATE_ORDER_PAY,
  GET_ONE_ORDER,
  GET_PENDING_SHAMCASH_PAYMENTS,
  APPROVE_SHAMCASH_PAYMENT,
  REJECT_SHAMCASH_PAYMENT,
} from "../type";

const inital = {
  getAllOrders: [],
  getOneOrder: [],
  changePay: [],
  changeDeliver: [],
  pendingShamCashPayments: [],
  approveShamCashPayment: [],
  rejectShamCashPayment: [],
};
const orderReducer = (state = inital, action) => {
  switch (action.type) {
    case GET_ALL_ORDER:
      return {
        ...state,
        getAllOrders: action.payload,
      };
    case GET_ONE_ORDER:
      return {
        ...state,
        getOneOrder: action.payload,
      };
    case UPDATE_ORDER_PAY:
      return {
        ...state,
        changePay: action.payload,
      };
    case UPDATE_ORDER_DELIVER:
      return {
        ...state,
        changeDeliver: action.payload,
      };
    case GET_PENDING_SHAMCASH_PAYMENTS:
      return {
        ...state,
        pendingShamCashPayments: action.payload,
      };
    case APPROVE_SHAMCASH_PAYMENT:
      return {
        ...state,
        approveShamCashPayment: action.payload,
      };
    case REJECT_SHAMCASH_PAYMENT:
      return {
        ...state,
        rejectShamCashPayment: action.payload,
      };
    default:
      return state;
  }
};
export default orderReducer;
