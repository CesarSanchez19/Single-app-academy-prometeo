import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    tokenHash: {
      type: String,
      required: [true, "Token hash is required"],
    },
    context: {
      type: String,
      enum: {
        values: ["session", "password-reset"],
        message: "Context must be session or password-reset",
      },
      default: "session",
    },
    device: {
      browser: { type: String, default: "Unknown" },
      os: { type: String, default: "Unknown" },
      raw: { type: String, default: "" },
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
    },
    revoked: {
      type: Boolean,
      default: false,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
      default: "Unknown",
    },
    usedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.index({ userId: 1, context: 1, revoked: 1 });
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Token = mongoose.model("Token", tokenSchema);

export default Token;
