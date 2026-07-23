import { Router } from "express";
import { getSessions, revoke } from "../controllers/session.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = Router();

router.use(protectRoute);

router.get("/", getSessions);
router.delete("/:tokenId", revoke);

export default router;
