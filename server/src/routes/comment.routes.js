// routes/comment.routes.js
import express from "express";
import { commentsController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  commentsController.createCommentController
);

router.delete(
  "/:commentId",
  authMiddleware,
  commentsController.deleteCommentController
);

router.get("/", commentsController.getCommentsController);

export default router;
