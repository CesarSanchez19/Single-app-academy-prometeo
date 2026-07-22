import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../../.env");

dotenv.config({ path: envPath });

const REQUIRED_VARS = ["MONGODB_URI", "JWT_SECRET"];

const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error("ERROR: Missing environment variables");
  missing.forEach((key) => {
    console.error(`→ ${key}`);
  });
  console.error(`Expected file: ${envPath}`);
  console.error("Copy .env.example → .env and fill in the values");
  process.exit(1);
}

export const env = Object.freeze({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  frontendUrl: process.env.CORS_ORIGIN || "http://localhost:5173",

  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "60d",

  resendApiKey: process.env.RESEND_API_KEY || "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",

  get isProduction() {
    return this.nodeEnv === "production";
  },

  get isDevelopment() {
    return this.nodeEnv === "development";
  },
});
