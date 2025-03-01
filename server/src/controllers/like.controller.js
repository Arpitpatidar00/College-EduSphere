// controllers/like.controller.js
import { likeService } from "../services/like.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import mongoose from "mongoose";

export async function toggleLikeController(req, res, next) {
  try {
    const { postId, like } = req.body;
    const userId = req.user.id; // Assumes auth middleware sets req.user

    // Validate inputs
    if (!postId || typeof like !== "boolean") {
      return BAD(res, null, "Post ID and like status (boolean) are required");
    }

    const likeData = {
      postId: new mongoose.Types.ObjectId(postId),
      userId: new mongoose.Types.ObjectId(userId),
    };

    let result;
    if (like) {
      result = await likeService.likePost(likeData);
      return OK(res, result, "Post liked successfully");
    } else {
      result = await likeService.unlikePost(likeData);
      return OK(res, result, "Post unliked successfully");
    }
  } catch (error) {
    next(error);
  }
}
