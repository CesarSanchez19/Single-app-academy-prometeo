import { getSystemMetrics } from "../services/admin.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getSystemLogs = asyncHandler(async (req, res) => {
  const metrics = await getSystemMetrics();

  return res.status(200).json({
    success: true,
    data: metrics,
  });
});
