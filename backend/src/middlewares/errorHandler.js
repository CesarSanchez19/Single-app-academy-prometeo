import { AppError, ValidationError } from "../utils/errors.js";

export const notFoundHandler = (req, res, next) => {
  next(new AppError(`Ruta no encontrada: ${req.originalUrl}`, 404));
};

export const errorHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err instanceof ValidationError && { errors: err.errors }),
    });
  }

  console.error("[Unexpected Error]", err.stack);

  const message =
    process.env.NODE_ENV === "production"
      ? "Error interno del servidor"
      : err.message;

  res.status(500).json({
    success: false,
    message,
  });
};