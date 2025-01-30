import express from "express";
import { collegeController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
//@ for Auth

router.post("/signup", collegeController.signupCollegeController);
router.post("/login", collegeController.loginCollegeController);

//@ for Auth Services
router.get("/verify-email", collegeController.verifyCollegeEmailController);
router.post(
  "/forgot-password",
  collegeController.forgotCollegePasswordController
);
router.post(
  "/reset-password",
  collegeController.resetCollegePasswordController
);
router.post(
  "/change-password",
  authMiddleware,
  collegeController.changeCollegePasswordController
);

export default router;
