// controllers/comment.controller.js
import { commentService } from "../services/comment.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { mongoose } from "mongoose";

export async function createCommentController(req, res, next) {
  try {
    const { postId, comment } = req.body;
    const userId = req.user.id; // From auth middleware

    if (!postId || !comment) {
      return BAD(res, null, "Post ID and comment text are required");
    }

    const commentData = {
      postId,
      userId,
      comment,
    };

    const newComment = await commentService.createComment(commentData);
    return OK(res, newComment, "Comment created successfully");
  } catch (error) {
    next(error);
  }
}

export async function deleteCommentController(req, res, next) {
  try {
    const { commentId } = req.params;
    const userId = req.user.id; // From auth middleware

    if (!commentId) {
      return BAD(res, null, "Comment ID is required");
    }

    const deletedComment = await commentService.deleteComment(
      commentId,
      userId
    );
    return OK(res, deletedComment, "Comment deleted successfully");
  } catch (error) {
    next(error);
  }
}
export async function getCommentsController(req, res, next) {
  try {
    const { postId, limit = 50, skip = 0 } = req.query;

    if (!postId) {
      return BAD(res, null, "Post ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return BAD(res, null, "Invalid Post ID");
    }

    const objectIdPostId = new mongoose.Types.ObjectId(postId);

    const comments = await commentService.getCommentsByPost(
      objectIdPostId,
      parseInt(limit),
      parseInt(skip)
    );

    return OK(res, comments, "Comments retrieved successfully");
  } catch (error) {
    next(error);
  }
}
