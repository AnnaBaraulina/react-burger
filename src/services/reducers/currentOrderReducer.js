import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    RESET_ORDER
} from '../actions/currentOrderAction';

const currentOrderInitialState = {
    order: undefined,
    orderRequest: false,
    orderError: false,
    orderErrorText: undefined,
};

export default function currentOrderReducer(
    state = currentOrderInitialState,
    action
) {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return { ...state, orderRequest: true};
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderRequest: false,
                orderError: false,
                order: action.payload,
            };
        case GET_ORDER_ERROR:
           return { ...state, orderRequest: false, orderError: true, orderErrorText: action.errorText};
         case RESET_ORDER:
            return {...state, order: undefined}  
        default: 
          return state;          
    }
}