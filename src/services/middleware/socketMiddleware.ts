import { Middleware } from "redux";
import { IWebSocket } from "../types/data";

export const socketMiddleware = (wsActions: IWebSocket): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let reconnectTimer = 0;
    let url = ''

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onClosed, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        url = payload;
        socket = new WebSocket(url);

        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: "" });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: "" });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log(parsedData);
          const { success, ...restParsedData } = parsedData;
          if (
            restParsedData.message === "Invalid or missing token" ||
            restParsedData.message === "jwt expired"
          ) {
            dispatch({ type: onError, payload: restParsedData.message });
          } else {
            dispatch({ type: onMessage, payload: restParsedData });
          }
        };

        socket.onclose = (event) => {          
          if (event.code !== 1000) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsInit, payload: url });
            }, 10000);
          }

          dispatch({ type: onClosed, payload: event.code });
        };
      } else if (type === onClose && socket) {
        console.log('close normal')
        socket.close(1000, "CLOSE_NORMAL");
        socket = null;
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
      }

      next(action);
    };
  };
};
