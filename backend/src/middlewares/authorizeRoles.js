import { ForbiddenError } from "../utils/errors.js";

export const authorizeRoles = (...allowedRoles) => {
  return (req, _res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError("No tienes permisos para acceder a este recurso")
      );
    }
    next();
  };
};
