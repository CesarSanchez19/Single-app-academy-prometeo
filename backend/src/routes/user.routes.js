import { Router } from "express";
import { getMe, updateMe, updateEmail } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = Router();

router.use(protectRoute);

router.get("/me", getMe);
router.patch("/me", updateMe);
router.patch("/me/email", updateEmail);

export default router;
