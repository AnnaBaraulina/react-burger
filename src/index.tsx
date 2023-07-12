import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createHashRouter } from "react-router-dom";
import App from "./components/App/App";
import { rootReducer } from "./services/reducers/index";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { BrowserRouter} from "react-router-dom";
import { store } from "./services/types/store";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "./services/actions/socketAction";

{/*const wsActions = {          //перенесла в store.ts
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
});*/}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
    <App/>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
);

{/*const router = createHashRouter([{ path: "/*", element: <App /> }]);*/}


{/*root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store} router={router}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
*/}
reportWebVitals();
