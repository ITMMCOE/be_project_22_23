import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import secureLocalStorage from "react-secure-storage";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import { AuthProvider } from "./component/context/UserContext";
// import { NotifyProvider } from "./component/context/ToastContext";
// import * as serviceWorker from './serviceWorker';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById("root"));


/* This code is adding a response interceptor to the Axios library. The interceptor is a function that
gets called for every response that Axios receives. */
axios.interceptors.response.use(
  response => response, // pass through non-error responses
  error => {
    // check if the error is due to a 401 status code
    if (error.response && error.response.status === 401) {
      // delete the local storage
      secureLocalStorage.clear();
      console.log("local storage cleared")
    }
    return Promise.reject(error);
  }
);

root.render(
  <React.StrictMode>
    {
      /* <AuthProvider>*/
      <ModalsProvider>
        <NotificationsProvider position="top-right">
          <App />
        </NotificationsProvider>
      </ModalsProvider>
      /*</AuthProvider> */
    }
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pa++++++++++ss a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
