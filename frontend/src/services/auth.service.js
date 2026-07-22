import { apiClient } from "./apiClient.js";

export const login = async (email, password) => {
  return await apiClient.post("/auth/login", { email, password });
};
