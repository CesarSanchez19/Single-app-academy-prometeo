import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

const DB_STATES = ["disconnected", "connected", "connecting", "disconnecting"];

export const getHealth = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Prometeo API funcionando correctamente 🔥",
    database: DB_STATES[mongoose.connection.readyState],
    timestamp: new Date().toISOString(),
  });
});