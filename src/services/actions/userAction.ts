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

import { IChangeUserDataRequest, ILoginUserRequest, IRegisterUserRequest, IResetPasswordRequest, ISetForgotPasswordFormValue, ISetLoginFormValue, ISetRegisterFormValue, ISetResetPasswordFormValue, IUserRegisterFormSubmit, IResetPasswordFormSubmit } from "../types/data";

import { AppDispatch } from "../types/index";

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

export const setRegisterFormValue = (field: string, value: string): ISetRegisterFormValue => {
  return {
    type: USER_REGISTER_FORM_SET_VALUE,
    field,
    value,
  };
}

export const setLoginFormValue = (field: string, value: string): ISetLoginFormValue => {
  return {
    type: USER_LOGIN_FORM_SET_VALUE,
    field,
    value,
  };
}

export const setForgotPasswordFormValue = (field: string, value: string): ISetForgotPasswordFormValue => {
  return {
    type: FORGOT_PASSWORD_FORM_SET_VALUE,
    field,
    value,
  };
}
export const setResetPasswordFormValue = (field: string, value: string): ISetResetPasswordFormValue => {
  return {
    type: RESET_PASSWORD_FORM_SET_VALUE,
    field,
    value,
  };
}

export function registerUser(userDate: IRegisterUserRequest, callback: () => void) {
  return function (dispatch: AppDispatch) {
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

export function loginUser(userDate: ILoginUserRequest, callback: () => void) {
  return function (dispatch: AppDispatch) {
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

export function logoutUser(refreshToken: string | undefined, callback: () => void) {
  return function (dispatch: AppDispatch) {
    
    logoutUserRequest(refreshToken).then(() => {
      dispatch({ type: USER_ACCESS_DENIED });
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      callback();
    });
  };
}

export function checkUserAccess() {
  return function (dispatch: AppDispatch) {
    const accessToken = getCookie("accessToken"); //добавила
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



export function refreshUserToken(refreshToken: string | undefined) { //переписала все внутри скобок
  return async function (dispatch: AppDispatch) {
    
      const response = await refreshTokenRequest(refreshToken);
      const accessToken = parseCookie(response.accessToken);
      const newRefreshToken = response.refreshToken;
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", newRefreshToken);
      dispatch(checkUserAccess());
    };
}

export function forgotPassword(email: { email: string }, callback: () => void) {
  return function (dispatch: AppDispatch) {
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

const resetPasswordFormSubmit = (): IResetPasswordFormSubmit => {
  return {
    type: RESET_PASSWORD_FORM_SUBMIT,
  };
};

export function resetPassword(userDate: IResetPasswordRequest, callback: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordFormSubmit());
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

export function changeUserData(userData: IChangeUserDataRequest) {
  return function (dispatch: AppDispatch) {
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
