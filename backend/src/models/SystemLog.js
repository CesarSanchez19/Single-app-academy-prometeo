import mongoose from "mongoose";

const systemLogSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      default: "System",
    },
    severity: {
      type: String,
      enum: ["fatal", "error", "warn", "warning", "info", "debug", "trace", "verbose"],
      default: "info",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

systemLogSchema.index({ timestamp: -1 });

const SystemLog = mongoose.model("SystemLog", systemLogSchema);

export default SystemLog;
