import React from "react";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { render } from "react-dom";
import { store, persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

const Index = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

render(<Index />, document.getElementById("root"));
