import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import Token from "../models/Token.js";
import { UnauthorizedError } from "../utils/errors.js";

export const protectRoute = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Access token is required");
    }

    const accessToken = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(accessToken, env.jwtSecret);
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        throw new UnauthorizedError("Access token has expired");
      }
      throw new UnauthorizedError("Invalid access token");
    }

    if (!decoded.tokenId) {
      throw new UnauthorizedError("Invalid token payload");
    }

    const tokenDoc = await Token.findOne({
      _id: decoded.tokenId,
      userId: decoded.userId,
      context: "session",
    }).lean();

    if (!tokenDoc) {
      throw new UnauthorizedError("Session not found");
    }

    if (tokenDoc.revoked) {
      const error = new UnauthorizedError(
        "Your session was closed from another device. Please sign in again."
      );
      error.code = "SESSION_REVOKED";
      throw error;
    }

    if (tokenDoc.expiresAt < new Date()) {
      throw new UnauthorizedError("Session has expired");
    }

    Token.updateOne(
      { _id: decoded.tokenId },
      { lastActiveAt: new Date() }
    ).exec();

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      accountType: decoded.accountType,
      tokenId: decoded.tokenId,
    };

    next();
  } catch (error) {
    next(error);
  }
};
