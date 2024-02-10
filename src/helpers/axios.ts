import Axios from "axios";
import Constants from "./constants";
const token = localStorage.getItem(Constants.ACCESS_TOKEN);
const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    console.log(token, "token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
