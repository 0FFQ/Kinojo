import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import darkTheme from "./app/theme";
import App from "./components/App";
import "bear-react-carousel/dist/index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter basename="/Kinojo">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
