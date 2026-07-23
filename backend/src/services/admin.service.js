import User from "../models/User.js";
import Token from "../models/Token.js";

export const getSystemMetrics = async () => {
  const now = new Date();

  const uptimeSeconds = process.uptime();
  const memory = process.memoryUsage();

  const [totalUsers, activeUsers, activeSessions] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ status: "active" }),
    Token.countDocuments({
      context: "session",
      revoked: false,
      expiresAt: { $gt: now },
    }),
  ]);

  const days = Math.floor(uptimeSeconds / 86400);
  const hours = Math.floor((uptimeSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const uptimeFormatted = `${days}d ${hours}h ${minutes}m`;

  const heapUsedMB = (memory.heapUsed / 1024 / 1024).toFixed(1);
  const heapTotalMB = (memory.heapTotal / 1024 / 1024).toFixed(1);
  const memoryPercent = ((memory.heapUsed / memory.heapTotal) * 100).toFixed(0);

  return {
    uptime: uptimeFormatted,
    uptimeSeconds: Math.floor(uptimeSeconds),
    memory: {
      heapUsedMB,
      heapTotalMB,
      percent: `${memoryPercent}%`,
      rss: (memory.rss / 1024 / 1024).toFixed(1),
    },
    activeSessions,
    totalUsers,
    activeUsers,
    timestamp: now.toISOString(),
  };
};
