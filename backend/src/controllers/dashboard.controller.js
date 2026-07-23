import { asyncHandler } from "../utils/asyncHandler.js";
import { getUserDashboard, getAdminDashboard } from "../services/dashboard.service.js";

export const getUserDashboardHandler = asyncHandler(async (req, res) => {
  const dashboardData = await getUserDashboard(req.user.userId);
  res.status(200).json({
    status: "success",
    data: dashboardData,
  });
});

export const getAdminDashboardHandler = asyncHandler(async (req, res) => {
  const dashboardData = await getAdminDashboard();
  res.status(200).json({
    status: "success",
    data: dashboardData,
  });
});
