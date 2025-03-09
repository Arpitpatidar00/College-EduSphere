import express from "express";
import { followController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/follow-user",
  authMiddleware,
  followController.toggleFollowController
);
router.get("/:userId/followers", followController.getFollowersController);
router.get("/:userId/following", followController.getFollowingController);
router.post(
  "/block-user/:userId",
  authMiddleware,
  followController.blockUserController
);

export default router;
