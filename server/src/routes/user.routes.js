import { Router } from "express";
import { userController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

//@ for Auth
router.post("/signup", userController.signupController);
router.post("/login", userController.loginController);

//@ for Auth Services
router.get("/verify-email", userController.verifyEmailController);
router.post("/forgot-password", userController.forgotPasswordController);
router.post("/reset-password", userController.resetPasswordController);
router.post(
  "/change-password",
  authMiddleware,
  userController.changePasswordController
);

export default router;
