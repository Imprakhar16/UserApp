import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://node-js-wse4.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 400) {
      console.log("Unauthorized access");
      localStorage.removeItem("authToken");
      // window.location.href = "/login";     //used to get or set the URL of the current page.
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
