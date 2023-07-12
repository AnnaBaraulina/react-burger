import { IWsConnectionStart, IWsConnectionSuccess, IWsConnectionClose, IWsConnectionClosed, IWsConnectionError, IWsGetMessage, IWsMessage } from "../types/data";

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSE = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";



export const wsConnectionStart = (url: string): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (event: string): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: event,
  };
};

export const wsConnectionClose = (): IWsConnectionClose => {
  return {
    type: WS_CONNECTION_CLOSE,
  };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED,
   
  };
};

export const wsGetMessage = (message: IWsMessage): IWsGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

