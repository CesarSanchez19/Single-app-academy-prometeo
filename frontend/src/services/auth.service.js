import { apiClient } from "./apiClient.js";

export const login = async (email, password) => {
  return await apiClient.post("/auth/login", { email, password });
};

export const register = async (name, lastname, email, password) => {
  return await apiClient.post("/auth/register", { name, lastname, email, password });
};
