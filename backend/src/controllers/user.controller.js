import User from "../models/User.js";
import Token from "../models/Token.js";
import bcrypt from "bcrypt";

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      data: {
        user: user.toJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, lastname } = req.body;
    
    if (!name || !lastname) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Name and lastname are required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name: name.trim(),
        lastname: lastname.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: updatedUser.toJSON(),
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: error.message,
      });
    }
    next(error);
  }
};

export const updateEmail = async (req, res, next) => {
  try {
    const { newEmail, password } = req.body;

    if (!newEmail || !password) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "New email and current password are required",
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        message: "Please provide a valid email address",
      });
    }

    const normalizedEmail = newEmail.toLowerCase().trim();

    const user = await User.findById(req.user.userId).select("+hashedPassword");
    if (!user) {
      return res.status(404).json({
        success: false,
        code: "USER_NOT_FOUND",
        message: "User not found",
      });
    }

    if (user.email === normalizedEmail) {
      return res.status(400).json({
        success: false,
        code: "SAME_EMAIL",
        message: "The new email must be different from the current email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(403).json({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "Incorrect password",
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser && existingUser._id.toString() !== req.user.userId.toString()) {
      return res.status(409).json({
        success: false,
        code: "EMAIL_ALREADY_EXISTS",
        message: "This email is already in use by another account",
      });
    }

    user.email = normalizedEmail;
    await user.save();

    await Token.updateMany(
      { userId: req.user.userId, context: "session", revoked: false },
      { revoked: true }
    );

    return res.status(200).json({
      success: true,
      message: "Email updated successfully. All sessions have been revoked.",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
