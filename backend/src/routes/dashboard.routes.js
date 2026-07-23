import { Router } from "express";
import { getUserDashboardHandler, getAdminDashboardHandler } from "../controllers/dashboard.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = Router();

router.use(protectRoute);

router.get("/user", getUserDashboardHandler);
router.get("/admin", authorizeRoles("admin"), getAdminDashboardHandler);

export default router;
