import {
  parseCookie,
  getCookie,
  setCookie,
  deleteCookie,
} from "../../utils/cookie";

import {
  registerUserRequest,
  loginUserRequest,
  checkUserAccessRequest,
  changeUserDataRequest,
  resetPasswordRequest,
  forgotPasswordRequest,
  logoutUserRequest,
  refreshTokenRequest,
} from "../../utils/api";

/*Экшены регистрации*/
export const USER_REGISTER_FORM_SET_VALUE = "USER_REGISTER_FORM_SET_VALUE";
export const USER_REGISTER_FORM_SUBMIT = "USER_REGISTER_FORM_SUBMIT";
export const USER_REGISTER_FORM_SUBMIT_SUCCESS =
  "USER_REGISTER_FORM_SUBMIT_SUCCESS";
export const USER_REGISTER_FORM_SUBMIT_FAILED =
  "USER_REGISTER_FORM_SUBMIT_FAILED";

/*Экшены авторизации */
export const USER_LOGIN_FORM_SET_VALUE = "USER_LOGIN_FORM_SET_VALUE";
export const USER_LOGIN_FORM_SUBMIT = "USER_LOGIN_FORM_SUBMIT";
export const USER_LOGIN_FORM_SUBMIT_SUCCESS = "USER_LOGIN_FORM_SUBMIT_SUCCESS";
export const USER_LOGIN_FORM_SUBMIT_FAILED = "USER_LOGIN_FORM_SUBMIT_FAILED";

/* Экшены доступа пользователя*/
export const USER_ACCESS_ALLOWED = "USER_ACCESS_ALLOWED";
export const USER_ACCESS_DENIED = "USER_ACCESS_DENIED";

/*Экшены формы forgot password */
export const FORGOT_PASSWORD_FORM_SET_VALUE = "FORGOT_PASSWORD_FORM_SET_VALUE";
export const FORGOT_PASSWORD_FORM_SUBMIT = "FORGOT_PASSWORD_FORM_SUBMIT";
export const FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS =
  "FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS";
export const FORGOT_PASSWORD_FORM_SUBMIT_FAILED =
  "FORGOT_PASSWORD_FORM_SUBMIT_FAILED";

/* Экшены формы reset password */
export const RESET_PASSWORD_FORM_SET_VALUE = "RESET_PASSWORD_FORM_SET_VALUE";
export const RESET_PASSWORD_FORM_SUBMIT = "RESET_PASSWORD_FORM_SUBMIT";
export const RESET_PASSWORD_FORM_SUBMIT_SUCCESS =
  "RESET_PASSWORD_FORM_SUBMIT_SUCCESS";
export const RESET_PASSWORD_FORM_SUBMIT_FAILED =
  "RESET_PASSWORD_FORM_SUBMIT_FAILED";

/*Экшены смены пароля*/
export const CHANGE_USER_DATA_FORM_SUBMIT = "CHANGE_USER_DATA_FORM_SUBMIT";
export const CHANGE_USER_DATA_FORM_SUBMIT_SUCCESS =
  "CHANGE_USER_DATA_FORM_SUBMIT_SUCCESS";
export const CHANGE_USER_DATA_FORM_SUBMIT_FAILED =
  "CHANGE_USER_DATA_FORM_SUBMIT_FAILED";

export function setRegisterFormValue(field, value) {
  return {
    type: USER_REGISTER_FORM_SET_VALUE,
    field,
    value,
  };
}

export function setLoginFormValue(field, value) {
  return {
    type: USER_LOGIN_FORM_SET_VALUE,
    field,
    value,
  };
}

export function setForgotPasswordFormValue(field, value) {
  return {
    type: FORGOT_PASSWORD_FORM_SET_VALUE,
    field,
    value,
  };
}
export function setResetPasswordFormValue(field, value) {
  return {
    type: RESET_PASSWORD_FORM_SET_VALUE,
    field,
    value,
  };
}

export function registerUser(userDate, callback) {
  return function (dispatch) {
    dispatch({ type: USER_REGISTER_FORM_SUBMIT });

    registerUserRequest(userDate)
      .then((res) => {
        setCookie("accessToken", parseCookie(res.accessToken));
        setCookie("refreshToken", res.refreshToken);
      })
      .then(() => {
        dispatch({ type: USER_REGISTER_FORM_SUBMIT_SUCCESS });
        callback();
      })
      .catch((error) => {
        console.log("Ошибка при регистрации пользователя", error);
        dispatch({ type: USER_REGISTER_FORM_SUBMIT_FAILED });
      });
  };
}

export function loginUser(userDate, callback) {
  return function (dispatch) {
    dispatch({ type: USER_LOGIN_FORM_SUBMIT });
    loginUserRequest(userDate)
      .then((res) => {
        
        dispatch({ type: USER_LOGIN_FORM_SUBMIT_SUCCESS, payload: res.user });
        setCookie("accessToken", parseCookie(res.accessToken));
        setCookie("refreshToken", res.refreshToken);
        callback();
      })
      .catch(() => {
        dispatch({ type: USER_LOGIN_FORM_SUBMIT_FAILED });
      });
  };
}

export function logoutUser(refreshToken, callback) {
  return function (dispatch) {
    
    logoutUserRequest(refreshToken).then(() => {
      dispatch({ type: USER_ACCESS_DENIED });
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      callback();
    });
  };
}

export function checkUserAccess() {
  return function (dispatch) {
    checkUserAccessRequest(getCookie("accessToken"))
      .then((res) => {
        dispatch({ type: USER_ACCESS_ALLOWED, payload: res.user });
      })
      .catch((err) => {
        if (err.message === "jwt expired" || err.message === "jwt malformed") {
          dispatch(refreshUserToken(getCookie("refreshToken")));
        }
      });
  };
}



export function refreshUserToken(refreshToken) {
  return async function (dispatch) {
    return refreshTokenRequest(refreshToken).then((res) => {
      setCookie("accessToken", parseCookie(res.accessToken));
      setCookie("refreshToken", res.refreshToken);
      dispatch(checkUserAccess(getCookie("accessToken")));
    });
  };
}

export function forgotPassword(email, callback) {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD_FORM_SUBMIT });
    forgotPasswordRequest(email)
      .then(() => {
        dispatch({ type: FORGOT_PASSWORD_FORM_SUBMIT_SUCCESS });
        callback();
      })
      .catch(() => {
        dispatch({ type: FORGOT_PASSWORD_FORM_SUBMIT_FAILED });
      });
  };
}

export function resetPassword(userDate, callback) {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_FORM_SUBMIT });
    resetPasswordRequest(userDate)
      .then(() => {
        dispatch({ type: RESET_PASSWORD_FORM_SUBMIT_SUCCESS });
        callback();
      })
      .catch(() => {
        dispatch({ type: RESET_PASSWORD_FORM_SUBMIT_FAILED });
      });
  };
}

export function changeUserData(userData) {
  return function (dispatch) {
    dispatch({ type: CHANGE_USER_DATA_FORM_SUBMIT });
    changeUserDataRequest(userData, getCookie("accessToken"))
      .then((res) => {
        dispatch({
          type: CHANGE_USER_DATA_FORM_SUBMIT_SUCCESS,
          payload: res.user,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired" || "jwt malformed") {
          dispatch(refreshUserToken(getCookie("refreshToken"))).then(() => {
            changeUserDataRequest(userData, getCookie("accesToken"))
              .then((res) => {
                dispatch({
                  type: CHANGE_USER_DATA_FORM_SUBMIT_SUCCESS,
                  payload: res.user,
                });
              })
              .catch(() => {
                dispatch({ type: CHANGE_USER_DATA_FORM_SUBMIT_FAILED });
              });
          });
        }
      });
  };
}
