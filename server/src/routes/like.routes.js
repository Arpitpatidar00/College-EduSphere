// routes/like.routes.js
import express from "express";
import { likesController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/toggle", authMiddleware, likesController.toggleLikeController);

export default router;
