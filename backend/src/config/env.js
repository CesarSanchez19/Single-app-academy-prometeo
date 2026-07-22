import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../../.env");

dotenv.config({ path: envPath });

const REQUIRED_VARS = ["MONGODB_URI"];

const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error("ERROR: Variables de entorno faltantes");
  missing.forEach((key) => {
    console.error(`→ ${key}`);
  });
  console.error(`Archivo esperado: ${envPath}`);
  console.error("Copia .env.example → .env y completa los valores");
  process.exit(1);
}

export const env = Object.freeze({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  get isProduction() {
    return this.nodeEnv === "production";
  },

  get isDevelopment() {
    return this.nodeEnv === "development";
  },
});
