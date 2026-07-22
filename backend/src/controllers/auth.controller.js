import { loginUser, registerUser } from "../services/auth.service.js";
import { ConflictError, ValidationError } from "../utils/errors.js";

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

    const { accessToken, refreshToken, user } = await loginUser({
      email: email.toLowerCase().trim(),
      password,
      userAgent,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 60 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        user,
      },
    });
  } catch (error) {
    if (error.code === "INVALID_CREDENTIALS") {
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
