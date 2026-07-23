import { Router } from "express";
import { getSessions, revoke } from "../controllers/session.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", getSessions);
router.delete("/:tokenId", revoke);

export default router;
