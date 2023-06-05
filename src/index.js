import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, useLocation } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import router from "./routes/Router";

 function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      <ScrollToTop>
        <App />
        </ScrollToTop>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
