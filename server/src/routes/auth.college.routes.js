import express from "express";
import { authCollegeController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
//@ for Auth

router.post("/signup", authCollegeController.signupCollegeController);
router.post("/login", authCollegeController.loginCollegeController);

//@ for Auth Services
router.get("/verify-email", authCollegeController.verifyCollegeEmailController);
router.post(
  "/forgot-password",
  authCollegeController.forgotCollegePasswordController
);
router.post(
  "/reset-password",
  authCollegeController.resetCollegePasswordController
);
router.post(
  "/change-password",
  authMiddleware,
  authCollegeController.changeCollegePasswordController
);

export default router;
