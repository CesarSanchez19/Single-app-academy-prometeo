import Token from "../models/Token.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

export const getActiveSessions = async (userId) => {
  const now = new Date();

  const sessions = await Token.find({
    userId,
    context: "session",
    revoked: false,
    expiresAt: { $gt: now },
  })
    .sort({ lastActiveAt: -1 })
    .select("_id device ipAddress lastActiveAt createdAt")
    .lean();

  return sessions.map((session) => ({
    id: session._id,
    device: {
      browser: session.device?.browser || "Unknown",
      os: session.device?.os || "Unknown",
    },
    ipAddress: session.ipAddress || "Unknown",
    lastActiveAt: session.lastActiveAt,
    createdAt: session.createdAt,
  }));
};

export const revokeSession = async ({ tokenId, userId }) => {
  const tokenDoc = await Token.findById(tokenId);

  if (!tokenDoc || tokenDoc.context !== "session") {
    throw new NotFoundError("Session not found or already revoked");
  }

  if (tokenDoc.userId.toString() !== userId.toString()) {
    throw new ForbiddenError("You do not have permission to revoke this session");
  }

  if (tokenDoc.revoked) {
    throw new NotFoundError("Session not found or already revoked");
  }

  tokenDoc.revoked = true;
  await tokenDoc.save();
};
