import axios from "axios";

const TOKEN_KEY = "auth_token";

const addAuthHeader = (config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const handleResponseError = (error) => {
  const status = error.response?.status;

  if (status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
  }

  if (status >= 500) {
    console.error("[API Error]", error.response?.data?.message ?? "Server error");
  }

  return Promise.reject(error);
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(addAuthHeader);
  axios.interceptors.response.use((res) => res, handleResponseError);
};
