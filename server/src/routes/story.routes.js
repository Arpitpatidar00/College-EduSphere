// routes/story.routes.js
import express from "express";
import { storiesController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { uploadFile } from "../config/multer.config.js";

const router = express.Router();

const upload = uploadFile();
const uploadFields = upload.fields([
  { name: "media", maxCount: 5 }, // Limit to 5 media items per story
]);

// Apply authMiddleware to all story routes
router.use(authMiddleware);

// Create a new story
router.post(
  "/create-story",
  uploadFields,
  storiesController.createStoryController
);

// Get all stories (e.g., from followed users or public)
router.get("/get-all-stories", storiesController.getAllStoriesController);

// Get a single story by ID
router.get("/:id", storiesController.getStoryController);

// Delete a story
router.delete("/delete-story/:id", storiesController.deleteStoryController);

// View a story (increment viewers)
router.post("/view-story/:id", storiesController.viewStoryController);

export default router;
