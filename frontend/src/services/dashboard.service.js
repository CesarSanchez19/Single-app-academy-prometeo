import { apiClient } from "./apiClient.js";

export const dashboardService = {
  getUserDashboard: () => apiClient.get("/dashboard/user"),
  getAdminDashboard: () => apiClient.get("/dashboard/admin"),
};
