import { Router } from "express";
import {
  changePassword,
  followUser,
  unfollowUser,
  updateProfilePicture,
  updateUserDetails,
} from "../controllers/userProfile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"; // Import multer middleware

const router = Router();

router.put("/changePassword", authMiddleware, changePassword);
router.post("/follow", authMiddleware, followUser);
router.post("/unfollow", authMiddleware, unfollowUser);
router.put("/updateUserDetails", authMiddleware, updateUserDetails);
router.put(
  "/updateProfilePicture",
  authMiddleware,
  upload.single("image"),
  updateProfilePicture
);

export default router;
