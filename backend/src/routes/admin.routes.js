import { Router } from "express";
import { getSystemLogs } from "../controllers/admin.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = Router();

router.use(protectRoute);
router.use(authorizeRoles("admin"));

router.get("/system-logs", getSystemLogs);

export default router;
