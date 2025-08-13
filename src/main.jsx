import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./app/Store.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
createRoot(document.getElementById("root")).render(
  <>
  <Provider store={store}>
    <ToastContainer />
    <App />
    </Provider>
  </>
);
