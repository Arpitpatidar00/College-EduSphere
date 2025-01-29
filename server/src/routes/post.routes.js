import { Router } from "express";
import { createPost, deletePost } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/createPost",
  // authMiddleware,
  upload.single("postImage"),
  createPost
);
router.delete("/deletePost/:postId", authMiddleware, deletePost);

export default router;
