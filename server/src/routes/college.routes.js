import express from "express";
import { collegeController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadFile } from "../config/multer.config.js";

const router = express.Router();
const upload = uploadFile();

const uploadFields = upload.fields([{ name: "profilePicture", maxCount: 10 }]);

router.get("/get-all-colleges", collegeController.getAllCollegeController);
router.patch(
  "/update",
  authMiddleware,
  uploadFields,
  collegeController.updateCollegeController
);

export default router;
