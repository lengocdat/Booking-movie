import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://movie0706.cybersoft.edu.vn/api/",
});

export const setToken = (token) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const userInfo =
  localStorage.getItem("credentials") &&
  JSON.parse(localStorage.getItem("credentials"));

if (userInfo !== null) {
  axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    return config;
  });
}

export default axiosClient;
