import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [80, "Name cannot exceed 80 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [80, "Last name cannot exceed 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "Role must be admin or user",
      },
      default: "user",
    },
    accountType: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "Account type must be either admin or user",
      },
      default: "user",
    },
    status: {
      type: String,
      enum: {
        values: ["active", "suspended", "inactive"],
        message: "Status must be active, suspended, or inactive",
      },
      default: "active",
    },
    lastActiveAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.hashedPassword;
        delete ret.__v;
        return ret;
      },
    },
  }
);


const User = mongoose.model("User", userSchema);

export default User;
