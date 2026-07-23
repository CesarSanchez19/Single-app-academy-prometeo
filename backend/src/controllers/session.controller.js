import { getActiveSessions, revokeSession } from "../services/session.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

  return res.status(200).json({
    success: true,
    message: "Session revoked successfully",
  });
});
