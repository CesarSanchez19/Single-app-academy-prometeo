import User from "../models/User.js";
import Token from "../models/Token.js";

export const getUserDashboard = async (userId) => {
  const now = new Date();
  
  const activeSessionsCount = await Token.countDocuments({
    userId,
    context: "session",
    revoked: false,
    expiresAt: { $gt: now },
  });

  const user = await User.findById(userId).select("name lastname role lastActiveAt").lean();

  return {
    user: {
      name: user?.name,
      lastname: user?.lastname,
      role: user?.role,
    },
    activeSessionsCount,
    lastAccess: user?.lastActiveAt || now,
  };
};

export const getAdminDashboard = async () => {
  const totalUsers = await User.countDocuments();

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentActiveUsersCount = await User.countDocuments({
    lastActiveAt: { $gte: oneDayAgo },
  });

  const recentConnectedUsers = await User.find()
    .sort({ lastActiveAt: -1 })
    .limit(5)
    .select("name lastname email role lastActiveAt")
    .lean();

  return {
    totalUsers,
    recentActiveUsersCount,
    recentConnectedUsers,
  };
};
