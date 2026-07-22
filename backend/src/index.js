import { env } from "./config/env.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import mainRouter from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

if (env.isDevelopment) {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(
        `${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
      );
    });
    next();
  });
}

app.use("/api/v1", mainRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  await connectDB(env.mongodbUri);

  const server = app.listen(env.port, () => {
    console.log(
      `Server running on http://localhost:${env.port} [${env.nodeEnv}]`
    );
  });

  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Closing server...`);
    server.close(async () => {
      await mongoose.connection.close();
      console.log("Connections closed. Process terminated.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer().catch((err) => {
  console.error("Fatal error starting the server:", err);
  process.exit(1);
});