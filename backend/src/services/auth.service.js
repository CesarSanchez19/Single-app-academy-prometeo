import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { UAParser } from "ua-parser-js";

import { env } from "../config/env.js";
import User from "../models/User.js";
import Token from "../models/Token.js";
import { ConflictError, ValidationError } from "../utils/errors.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PASSWORD_RULES = {
  minLength: 8,
  uppercase: /[A-Z]/,
  number: /\d/,
};

export const registerUser = async ({ name, lastname, email, password }) => {
  const errors = [];

  if (!name || !lastname || !email || !password) {
    throw new ValidationError("All fields are required");
  }

  if (password.length < PASSWORD_RULES.minLength) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!PASSWORD_RULES.uppercase.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!PASSWORD_RULES.number.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (errors.length > 0) {
    throw new ValidationError("Password does not meet requirements", errors);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      name: name.trim(),
      lastname: lastname.trim(),
      email: email.toLowerCase().trim(),
      hashedPassword,
    });

    return user.toJSON();
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictError(
        "This email is already registered. Try logging in."
      );
    }
    throw error;
  }
};

export const loginUser = async ({ email, password, userAgent = "", ip = "Unknown" }) => {
  const user = await User.findOne({ email }).select("+hashedPassword");

  if (!user) {
    const error = new Error("Incorrect email or password");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  if (user.status !== "active") {
    const error = new Error(
      "Your account is suspended. Please contact the administrator."
    );
    error.code = "ACCOUNT_SUSPENDED";
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    const error = new Error("Incorrect email or password");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const parser = new UAParser(userAgent || "");
  const browserInfo = parser.getBrowser();
  const osInfo = parser.getOS();

  const refreshToken = jwt.sign(
    { userId: user._id },
    env.jwtRefreshSecret,
    { expiresIn: env.jwtRefreshExpiresIn }
  );

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const refreshExpiresMs = parseExpiration(env.jwtRefreshExpiresIn);
  const expiresAt = new Date(Date.now() + refreshExpiresMs);

  const tokenDoc = await Token.create({
    userId: user._id,
    tokenHash,
    context: "session",
    device: {
      browser: browserInfo.name
        ? `${browserInfo.name} ${browserInfo.version || ""}`.trim()
        : "Unknown",
      os: osInfo.name
        ? `${osInfo.name} ${osInfo.version || ""}`.trim()
        : "Unknown",
      raw: (userAgent || "").substring(0, 500),
    },
    ipAddress: ip || "Unknown",
    expiresAt,
    revoked: false,
    lastActiveAt: new Date(),
  });

  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      tokenId: tokenDoc._id,
    },
    env.jwtSecret,
    { expiresIn: env.jwtAccessExpiresIn }
  );

  user.lastActiveAt = new Date();
  await user.save({ validateBeforeSave: false });

  const userObj = user.toJSON();

  return {
    accessToken,
    refreshToken,
    tokenId: tokenDoc._id,
    user: userObj,
  };
};

function parseExpiration(expiresIn) {
  const match = expiresIn.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return 60 * 24 * 60 * 60 * 1000; 

  const value = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return value * multipliers[unit];
}

export const forgotPassword = async ({ email }) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return;
  }

  await Token.updateMany(
    { userId: user._id, context: "password-reset", revoked: false },
    { revoked: true }
  );

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await Token.create({
    userId: user._id,
    tokenHash,
    context: "password-reset",
    expiresAt,
    revoked: false,
    usedAt: null,
  });

  const resetLink = `${env.frontendUrl}/reset-password?token=${rawToken}`;

  console.log(`\n[Password Reset] Link for ${normalizedEmail}:\n${resetLink}\n`);

  const logsDir = path.resolve(__dirname, "../../logs");
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  const logEntry = `[${new Date().toISOString()}] ${normalizedEmail} → ${resetLink}\n`;
  fs.appendFileSync(path.join(logsDir, "reset-links.log"), logEntry, "utf-8");

  try {
    const { sendResetPasswordEmail } = await import("./email.service.js");
    await sendResetPasswordEmail({ to: normalizedEmail, resetLink });
  } catch (emailError) {
    console.error(
      "[Email] Failed to send recovery email via Resend:",
      emailError.message
    );
  }
};

export const resetPassword = async ({ token, newPassword }) => {
  const tokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const tokenDoc = await Token.findOne({
    tokenHash,
    context: "password-reset",
  });

  if (!tokenDoc) {
    const error = new Error("Invalid or expired password reset link.");
    error.code = "TOKEN_INVALID";
    throw error;
  }

  if (tokenDoc.revoked) {
    const error = new Error("Invalid or expired password reset link.");
    error.code = "TOKEN_INVALID";
    throw error;
  }

  if (tokenDoc.expiresAt < new Date()) {
    const error = new Error(
      "This link has expired. Please request a new one."
    );
    error.code = "TOKEN_EXPIRED";
    throw error;
  }

  if (tokenDoc.usedAt !== null) {
    const error = new Error(
      "This link has already been used. Please request a new one if you need to reset your password."
    );
    error.code = "TOKEN_USED";
    throw error;
  }

  const errors = [];
  if (newPassword.length < PASSWORD_RULES.minLength) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!PASSWORD_RULES.uppercase.test(newPassword)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!PASSWORD_RULES.number.test(newPassword)) {
    errors.push("Password must contain at least one number");
  }

  if (errors.length > 0) {
    throw new ValidationError("Password does not meet requirements", errors);
  }

  const user = await User.findById(tokenDoc.userId).select("+hashedPassword");
  if (user) {
    const isSamePassword = await bcrypt.compare(newPassword, user.hashedPassword);
    if (isSamePassword) {
      throw new ValidationError("New password must be different from your current password");
    }
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await User.findByIdAndUpdate(tokenDoc.userId, { hashedPassword });

  tokenDoc.usedAt = new Date();
  await tokenDoc.save();

  await Token.updateMany(
    { userId: tokenDoc.userId, context: "session", revoked: false },
    { revoked: true }
  );
};

export const logoutUser = async ({ tokenId }) => {
  const tokenDoc = await Token.findById(tokenId);

  if (tokenDoc && !tokenDoc.revoked) {
    tokenDoc.revoked = true;
    await tokenDoc.save();
  }
};
