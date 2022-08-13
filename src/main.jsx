import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { StoreProvider } from "easy-peasy";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
