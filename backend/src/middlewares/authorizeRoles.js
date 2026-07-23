import { ForbiddenError } from "../utils/errors.js";
import { logSystemEvent } from "../utils/logger.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, _res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      logSystemEvent({
        event: "Unauthorized admin route access attempt",
        user: req.user ? `${req.user.name || ""} ${req.user.lastname || ""}`.trim() || req.user.email : "Anonymous",
        severity: "warning",
      });
      return next(
        new ForbiddenError("No tienes permisos para acceder a este recurso")
      );
    }
    next();
  };
};
