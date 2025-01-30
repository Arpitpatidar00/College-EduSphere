// routes/admin.routes.js

import express from "express";
import { adminController } from "../controllers/index.js";
import { adminCheckMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

//@ for Auth
router.post("/login", adminController.signupController);
router.post("/signup", adminController.loginController);

//@ for Auth Services
router.get("/verify-email", adminController.verifyEmailController);
router.post("/forgot-password", adminController.forgotPasswordController);
router.post("/reset-password", adminController.resetPasswordController);
router.post(
  "/change-password",
  adminCheckMiddleware,
  adminController.changePasswordController
);

export default router;
