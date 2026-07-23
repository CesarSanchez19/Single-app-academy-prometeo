import { apiClient } from "./apiClient.js";

export const getUserProfile = async () => {
  return await apiClient.get("/users/me");
};

export const updateUserProfile = async (data) => {
  return await apiClient.patch("/users/me", data);
};

export const updateUserEmail = async (data) => {
  return await apiClient.patch("/users/me/email", data);
};
