import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadFile } from "../config/multer.config.js";
import { storiesController } from "../controllers/index.js";

const router = express.Router();
const upload = uploadFile();

const uploadFields = upload.fields([{ name: "media", maxCount: 1 }]);

// Create or update story with new media
router.post(
  "/create-or-update",
  authMiddleware,
  uploadFields,
  storiesController.createOrUpdateStoryController
);

// Get all stories
router.get(
  "/get-all-stories",
  authMiddleware,
  storiesController.getAllStoriesController
);

// Get single story
router.get("/:id", authMiddleware, storiesController.getStoryController);

// Delete entire story
router.delete("/:id", authMiddleware, storiesController.deleteStoryController);

// Delete specific media from story
router.delete(
  "/:id/media/:mediaIndex",
  authMiddleware,
  storiesController.deleteMediaController
);

// Add view to specific media
router.post(
  "/:id/view",
  authMiddleware,
  storiesController.addStoryViewController
);

// Add reaction to specific media
router.post(
  "/:id/reaction",
  authMiddleware,
  storiesController.addStoryReactionController
);

// Remove reaction from specific media
router.delete(
  "/:id/reaction",
  authMiddleware,
  storiesController.removeStoryReactionController
);

// Get views for story
router.get(
  "/:id/views",
  authMiddleware,
  storiesController.getStoryViewsController
);

export default router;
