// routes/student.routes.js
import { Router } from "express";
import { studentController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadFile } from "../config/multer.config.js";

const router = Router();

const upload = uploadFile();

const uploadFields = upload.fields([{ name: "profilePicture", maxCount: 10 }]);

//@ for Student Updates
router.patch(
  "/update",
  authMiddleware,
  uploadFields,
  studentController.updateStudentController
);

export default router;
