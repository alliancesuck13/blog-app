/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./config/Theme";
import App from "./app";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider theme={theme} resetCSS>
      <BrowserRouter>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
