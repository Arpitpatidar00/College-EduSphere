import express from "express";
import { postController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // Ensure this middleware is implemented
import { uploadFile } from "../config/multer.config.js";

const router = express.Router();

const upload = uploadFile();

const uploadFields = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "media", maxCount: 10 },
]);

// Create a new post
// Configure Multer to handle two fields:
// - "coverImage": a single file for the post's cover image.
// - "media": an array of files for additional media.
router.post(
  "/create-post",
  authMiddleware,
  uploadFields,
  postController.createPostController
);

// Get all posts
router.get(
  "/get-all-posts",
  authMiddleware,
  postController.getAllPostsController
);

// Get a single post by ID
router.get("/:id", authMiddleware, postController.getPostController);

// Update an existing post
router.put(
  "update-post/:id",
  authMiddleware,
  uploadFields,
  postController.updatePostController
);

// Delete a post
router.delete(
  "/delete-post/:id",
  authMiddleware,
  postController.deletePostController
);

// Toggle post active status
router.patch(
  "/:id/toggle-active",
  authMiddleware,
  postController.togglePostActiveStatusController
);

// Like a post
router.post("/add-like/:id", authMiddleware, postController.likePostController);

// Unlike a post
router.post(
  "/remove-like/:id",
  authMiddleware,
  postController.unlikePostController
);

// Increment post view count
router.post(
  "/:id/increment-view",
  authMiddleware,
  postController.incrementPostViewController
);

export default router;
