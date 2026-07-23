import { apiClient } from "./apiClient.js";

export const getSystemLogs = async () => {
  return await apiClient.get("/admin/system-logs");
};
