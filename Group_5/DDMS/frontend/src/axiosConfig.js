import axios from "axios";

const axiosInstance = axios.create({});
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? `http://${process.env.REACT_APP_API_HOST}:5000`
    : "http://localhost:5000";
// "http://192.168.217.107:5000";
export default axiosInstance;
