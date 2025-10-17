import { CREATE_ORDER_CASH, CREATE_ORDER_CRAD, CREATE_ORDER_SHAMCASH } from '../type'

const inital = {
    createOrderCash: [],
    createOrderCard: [],
    createOrderShamCash: [],
}
const checkoutReducer = (state = inital, action) => {
    switch (action.type) {
        case CREATE_ORDER_CASH:
            return {
                ...state,
                createOrderCash: action.payload,
            }
        case CREATE_ORDER_CRAD:
            return {
                ...state,
                createOrderCard: action.payload,
            }
        case CREATE_ORDER_SHAMCASH:
            return {
                ...state,
                createOrderShamCash: action.payload,
            }
        default:
            return state;
    }
}
export default checkoutReducer