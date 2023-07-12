import {
  INGREDIENTS_URL,
  ORDER_URL,
  REGISTER_URL,
  LOGIN_URL,
  LOGOUT_URL,
  TOKEN_URL,
  CHECK_ACCESS_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
} from "../utils/variables";

import { IRegisterUserRequest,  ILoginUserRequest, IResetPasswordRequest, IChangeUserDataRequest} from "../services/types/data";



const checkResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getIngredients = async () => {
  return fetch(`${INGREDIENTS_URL}`).then(checkResponse);
};


{/*export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshTokenRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("accessCookie", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};*/}

const apiOrder = async (idList: Array<string>, accessToken: string | undefined) => {
  return fetch(ORDER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      ingredients: idList,
    }),
  }).then(checkResponse);
};

const registerUserRequest = async (userDate: IRegisterUserRequest) => {
  return fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDate),
  }).then(checkResponse);
};

const loginUserRequest = async (userDate: ILoginUserRequest) => {
  return fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDate),
  }).then(checkResponse);
};

const logoutUserRequest = async (refreshToken: string | undefined) => {
  return fetch(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse);
};

const checkUserAccessRequest = async (accessToken: string | undefined) => {
  return fetch(CHECK_ACCESS_URL, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  }).then(checkResponse);
};

const refreshTokenRequest = async (refreshToken: string | undefined) => {
  return fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse);
};

const forgotPasswordRequest = async (email: { email: string }) => {
  return fetch(FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then(checkResponse);
};

const resetPasswordRequest = async (userDate: IResetPasswordRequest) => {
  return fetch(RESET_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDate),
  }).then(checkResponse);
};

const changeUserDataRequest = async (userDate: IChangeUserDataRequest, accessToken: string | undefined) => {
  return fetch(CHECK_ACCESS_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userDate),
  }).then(checkResponse);
};

export {
  apiOrder,
  getIngredients,
  registerUserRequest,
  loginUserRequest,
  logoutUserRequest,
  checkUserAccessRequest,
  refreshTokenRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  changeUserDataRequest,
};
