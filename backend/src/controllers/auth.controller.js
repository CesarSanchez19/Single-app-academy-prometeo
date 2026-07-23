import {
  loginUser,
  registerUser,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
  logoutUser,
} from "../services/auth.service.js";
import { ConflictError, ValidationError } from "../utils/errors.js";
import { logSystemEvent } from "../utils/logger.js";

export const register = async (req, res, next) => {
  try {
    const { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "All fields are required",
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide a valid email address",
      });
    }

    const user = await registerUser({ name, lastname, email, password });

    logSystemEvent({
      event: "New user registered",
      user: `${name} ${lastname}`,
      severity: "info",
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: { user },
    });
  } catch (error) {
    if (error instanceof ConflictError) {
      return res.status(409).json({
        success: false,
        code: "EMAIL_ALREADY_EXISTS",
        message: error.message,
      });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: error.message,
        ...(error.errors?.length && { errors: error.errors }),
      });
    }

    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Email and password are required",
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide a valid email address",
      });
    }

    const userAgent = req.headers["user-agent"] || "";
    const ip = req.ip || req.connection.remoteAddress || "Unknown";

    const { accessToken, refreshToken, tokenId, user } = await loginUser({
      email: email.toLowerCase().trim(),
      password,
      userAgent,
      ip,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 60 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    logSystemEvent({
      event: "Successful login",
      user: user.name ? `${user.name} ${user.lastname}` : email,
      severity: "info",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        tokenId,
        user,
      },
    });
  } catch (error) {
    if (error.code === "INVALID_CREDENTIALS") {
      logSystemEvent({
        event: "Failed login attempt (Invalid credentials)",
        user: req.body.email || "Unknown",
        severity: "warning",
      });
      return res.status(401).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: error.message,
      });
    }

    if (error.code === "ACCOUNT_SUSPENDED") {
      return res.status(403).json({
        success: false,
        code: "ACCOUNT_SUSPENDED",
        message: error.message,
      });
    }

    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Email is required",
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide a valid email address",
      });
    }

    await forgotPasswordService({ email });

    logSystemEvent({
      event: "Password reset request sent",
      user: email,
      severity: "info",
    });

    return res.status(200).json({
      success: true,
      message:
        "If an account with that email exists, we have sent a password recovery link.",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Token and new password are required",
      });
    }

    await resetPasswordService({ token, newPassword });

    logSystemEvent({
      event: "Password changed via reset token",
      user: "System (Reset Link)",
      severity: "info",
    });

    return res.status(200).json({
      success: true,
      message:
        "Your password has been reset successfully. You can now log in with your new password.",
      data: null,
    });
  } catch (error) {
    if (error.code === "TOKEN_EXPIRED") {
      return res.status(400).json({
        success: false,
        code: "TOKEN_EXPIRED",
        message: error.message,
      });
    }

    if (error.code === "TOKEN_USED") {
      return res.status(400).json({
        success: false,
        code: "TOKEN_USED",
        message: error.message,
      });
    }

    if (error.code === "TOKEN_INVALID") {
      return res.status(400).json({
        success: false,
        code: "TOKEN_INVALID",
        message: error.message,
      });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: error.message,
        ...(error.errors?.length && { errors: error.errors }),
      });
    }
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    if (req.user && req.user.tokenId) {
      await logoutUser({ tokenId: req.user.tokenId });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
