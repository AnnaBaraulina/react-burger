import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  RESET_ORDER,
  SET_CURRENT_ORDER,
  RESET_CURRENT_ORDER,
} from "../actions/currentOrderAction";

const currentOrderInitialState = {
  order: undefined,
  orderRequest: false,
  orderError: null,
  orderErrorText: undefined,
  currentOrder: undefined,
};

export default function currentOrderReducer(
  state = currentOrderInitialState,
  action
) {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { ...state, orderRequest: true, orderError: null };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderError: null,
        order: action.payload,
      };
    case GET_ORDER_ERROR:
      return {
        ...state,
        orderRequest: false,
        orderError: true,
        orderErrorText: action.errorText,
      };
    case RESET_ORDER:
      return { ...state, order: undefined };

    case SET_CURRENT_ORDER:
      return { ...state, currentOrder: action.payload };

    case RESET_CURRENT_ORDER:
      return { ...state, currentOrder: undefined };

    default:
      return state;
  }
}
