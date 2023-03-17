import axios from "axios";
import { message, notification } from "antd";
import { logOut } from "../store/reducers/AuthReducer";
import store from "../store/store";

export const ACCESS_TOKEN = "access_token";

export const baseHost = "localhost:8086";
// export const baseHost = "192.168.1.146:8080";

export const axiosInstance = axios.create({
  baseURL: `http://${baseHost}/api/`,
});

export const privateAxiosInstance = axios.create({
  baseURL: `http://${baseHost}/api/`,
});

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Error",
    description: "You have no rights to see this content.",
  });
};

privateAxiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

privateAxiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },

  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      // originalRequest._isRetry = true;
      // try {
      //   const res = await privateAxiosInstance.get("/user/refresh/token");

      //   localStorage.removeItem(ACCESS_TOKEN);
      //   localStorage.setItem(ACCESS_TOKEN, res.data.token);
      //   originalRequest.headers["Authorization"] = "Bearer " + res.data.token;
      //   originalRequest._isRetry = false;
      //   return privateAxiosInstance.request(originalRequest);
      // } catch (e) {
      //   originalRequest._isRetry = true;
      //   store.dispatch(logOut());
      //   message.error("Authorize token was expired, please login again");
      // }
      originalRequest._isRetry = true;
      store.dispatch(logOut());
      message.error("Authorize token was expired, please login again");
    }

    if (error.response.status === 403) {
      openNotificationWithIcon("error");
    }

    return Promise.reject(error);
  }
);
