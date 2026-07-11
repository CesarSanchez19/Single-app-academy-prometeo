export const healthAdapter = (rawHealth) => ({
  message: rawHealth.message,
  database: rawHealth.database,
  timestamp: rawHealth.timestamp,
});
