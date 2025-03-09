// routes/student.routes.js
import { Router } from "express";
import { authStudentController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadFile } from "../config/multer.config.js";

const router = Router();

const upload = uploadFile();

const uploadFields = upload.fields([{ name: "userImage", maxCount: 10 }]);
//@ for Auth
router.post("/signup", authStudentController.signupController);
router.post("/login", authStudentController.loginController);

//@ for Auth Services
router.get("/verify-email", authStudentController.verifyEmailController);
router.post("/forgot-password", authStudentController.forgotPasswordController);
router.post("/reset-password", authStudentController.resetPasswordController);
router.post(
  "/change-password",
  authMiddleware,
  authStudentController.changePasswordController
);

export default router;
