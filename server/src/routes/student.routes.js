import { Router } from "express";
import { studentController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//@ for Auth
router.post("/signup", studentController.signupController);
router.post("/login", studentController.loginController);

//@ for Auth Services
router.get("/verify-email", studentController.verifyEmailController);
router.post("/forgot-password", studentController.forgotPasswordController);
router.post("/reset-password", studentController.resetPasswordController);
router.post(
  "/change-password",
  authMiddleware,
  studentController.changePasswordController
);

export default router;
