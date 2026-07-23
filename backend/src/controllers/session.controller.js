import { getActiveSessions, revokeSession } from "../services/session.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { logSystemEvent } from "../utils/logger.js";

export const getSessions = asyncHandler(async (req, res) => {
  const sessions = await getActiveSessions(req.user.userId);

  return res.status(200).json({
    success: true,
    data: sessions,
  });
});

export const revoke = asyncHandler(async (req, res) => {
  const { tokenId } = req.params;

  await revokeSession({ tokenId, userId: req.user.userId });

  logSystemEvent({
    event: "Session manually revoked",
    user: req.user.email || req.user.userId,
    severity: "info",
  });

  return res.status(200).json({
    success: true,
    message: "Session revoked successfully",
  });
});
