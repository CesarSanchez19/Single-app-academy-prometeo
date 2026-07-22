import { apiClient } from "./apiClient.js";

export const login = async (email, password) => {
  return await apiClient.post("/auth/login", { email, password });
};

export const register = async (name, lastname, email, password) => {
  return await apiClient.post("/auth/register", { name, lastname, email, password });
};

export const forgotPassword = async (email) => {
  return await apiClient.post("/auth/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
  return await apiClient.post("/auth/reset-password", { token, newPassword });
};
