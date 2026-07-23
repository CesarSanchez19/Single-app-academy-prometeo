import SystemLog from "../models/SystemLog.js";

export const logSystemEvent = async ({ event, user, severity = "info" }) => {
  try {
    const log = new SystemLog({
      event,
      user: user || "System",
      severity,
    });
    log.save().catch(err => console.error("Failed to save system log:", err));
  } catch (error) {
    console.error("Error creating system log:", error);
  }
};
