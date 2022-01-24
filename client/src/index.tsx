import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import "./index.css";
import App from "./App";
import { setupStore } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const store = setupStore();

let persist = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
