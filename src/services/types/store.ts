import { rootReducer } from "../../services/reducers/index";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "../../services/middleware/socketMiddleware";



import { WS_CONNECTION_START, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_GET_MESSAGE } from "../constants";
  
  const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSE,
    onClosed: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
  };

  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware(wsActions)),
  });


