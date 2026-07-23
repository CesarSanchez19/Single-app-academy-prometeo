import { apiClient } from "./apiClient.js";

export const getSessions = async () => {
  return await apiClient.get("/sessions");
};

export const revokeSession = async (tokenId) => {
  return await apiClient.delete(`/sessions/${tokenId}`);
};

export const logout = async () => {
  return await apiClient.post("/auth/logout");
};
