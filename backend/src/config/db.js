import mongoose from "mongoose";
import { logSystemEvent } from "../utils/logger.js";

export const connectDB = async (uri) => {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not defined. Check your .env file at the root of the monorepo."
    );
  }

  mongoose.connection.on("connected", () => {
    const dbName = mongoose.connection.db?.databaseName || "unknown";
    console.log(`MongoDB connected — Database: ${dbName}`);
    logSystemEvent({
      event: `Database connection established — Database: ${dbName}`,
      user: "System",
      severity: "info"
    });
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  try {
    await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (error) {
    console.error("ERROR: MONGODB ATLAS CONNECTION FAILED");
    console.error(`Cause: ${error.message}`);
    console.error("Possible solutions:");
    console.error("1. Check that MONGODB_URI is correct in .env");
    console.error("2. Check that your IP is in Atlas Network Access");
    console.error("3. Check that the cluster is active (not paused)");
    console.error("4. Check username and password in connection string");
    process.exit(1);
  }
};