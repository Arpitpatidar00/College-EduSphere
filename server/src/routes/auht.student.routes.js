// routes/student.routes.js
import { Router } from "express";
import { studentController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadFile } from "../config/multer.config.js";

const router = Router();

const upload = uploadFile();

const uploadFields = upload.fields([{ name: "userImage", maxCount: 10 }]);
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

//@ for Student Updates
router.put(
  "/update-profile",
  authMiddleware,
  uploadFields,
  studentController.updateStudentController // New controller
);

export default router;
