import { Router } from "express";
import { userController } from "../controllers/index.js";

const router = Router();

router.post("/signup", userController.signupController);
router.post("/login", userController.loginController);

export default router;
