import { apiOrder } from "../../utils/api";
import { refreshUserToken } from "./userAction";
import { getCookie } from "../../utils/cookie";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const RESET_ORDER = 'RESET_ORDER';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const RESET_CURRENT_ORDER = 'RESET_CURRENT_ORDER';



export function makeOrder(ingredients) {
    return function (dispatch) {
      const arrayId = [
        ingredients.constructorBunElement._id,
        ...ingredients.constructorFillingList.map((item) => item._id),
        ingredients.constructorBunElement._id,
      ];
      dispatch({ type: GET_ORDER_REQUEST });
      apiOrder(arrayId, getCookie('accessToken'))
        .then((res) => {
          dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number });
        })
        .catch((err) => {
          if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
            dispatch(refreshUserToken(getCookie('refreshToken')))
              .then(() => {
                return apiOrder(arrayId, getCookie('accessToken'));
              })
              .then((res) => {
                dispatch({
                  type: GET_ORDER_SUCCESS,
                  payload: res.order.number,
                });
              })
              .catch(() => {
                dispatch({
                  type: GET_ORDER_FAILED,
                  errorText: 'Ошибка при формировании заказа',
                });
              });
          }
        });
    };
  }

{/*export function makeOrder(ingredients) {
    
    return function (dispatch) {
        const arrayId = [
            ingredients.constructorBunElement._id,
            ...ingredients.constructorFillingList.map((item) => item._id),
            ingredients.constructorBunElement._id,
        ]
        dispatch({ type: GET_ORDER_REQUEST });
        apiOrder(arrayId, getCookie('accessToken'))
         .then((res) => {
            dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number });
         })
         .catch((err) => {
            if (err.message ===  'jwt expired' || "jwt malformed") {
                dispatch(refreshUserToken(getCookie('refreshToken'))).then(() => {
                    apiOrder(arrayId, getCookie('accessToken'))
                     .then((res)=> {
                        dispatch({
                            type: GET_ORDER_SUCCESS,
                            payload: res.order.number,
                        });
                     })
                    .catch(() => {
                        dispatch({
                            type: GET_ORDER_FAILED,
                            errorText: "Ошибка при формировании заказа",
                        });
                    });
                });
            }
         });
    };
}*/}

