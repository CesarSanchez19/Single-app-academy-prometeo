import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UAParser } from "ua-parser-js";

import { env } from "../config/env.js";
import User from "../models/User.js";
import Token from "../models/Token.js";

export const loginUser = async ({ email, password, userAgent = "" }) => {
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

  const accessToken = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
    },
    env.jwtSecret,
    { expiresIn: env.jwtAccessExpiresIn }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    env.jwtRefreshSecret,
    { expiresIn: env.jwtRefreshExpiresIn }
  );

  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const parser = new UAParser(userAgent || "");
  const browserInfo = parser.getBrowser();
  const osInfo = parser.getOS();

  const refreshExpiresMs = parseExpiration(env.jwtRefreshExpiresIn);
  const expiresAt = new Date(Date.now() + refreshExpiresMs);

  await Token.create({
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
    expiresAt,
    revoked: false,
  });

  user.lastActiveAt = new Date();
  await user.save({ validateBeforeSave: false });

  const userObj = user.toJSON();

  return {
    accessToken,
    refreshToken,
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
