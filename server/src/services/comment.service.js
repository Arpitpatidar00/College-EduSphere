// services/comment.service.js
import mongoose from "mongoose";
import Comments from "../database/models/comments.model.js"; // Adjust path as needed

class CommentService {
  static instance = null;

  static getInstance() {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  /**
   * Creates a new comment
   * @param {Object} commentData - Contains postId, userId, and comment
   * @returns {Promise<Object>} The created comment document
   */
  async createComment({ postId, userId, comment }) {
    const newComment = new Comments({
      postId: new mongoose.Types.ObjectId(postId),
      userId: new mongoose.Types.ObjectId(userId),
      comment,
    });
    return await newComment.save();
  }

  /**
   * Soft deletes a comment by setting isActive to false
   * @param {String} commentId - The ID of the comment to delete
   * @param {String} userId - The ID of the user requesting deletion
   * @returns {Promise<Object>} The updated comment document
   * @throws {Error} If comment not found or user unauthorized
   */
  async deleteComment(commentId, userId) {
    const comment = await Comments.findOne({
      _id: new mongoose.Types.ObjectId(commentId),
      userId: new mongoose.Types.ObjectId(userId),
      isActive: true,
    });

    if (!comment) {
      throw new Error(
        "Comment not found or you are not authorized to delete it"
      );
    }

    comment.isActive = false;
    return await comment.save();
  }

  /**
   * Retrieves all active comments for a post
   * @param {String} postId - The ID of the post
   * @param {Number} limit - Number of comments to return (default: 50)
   * @param {Number} skip - Number of comments to skip (default: 0)
   * @returns {Promise<Array>} Array of comment documents
   */
  async getCommentsByPost(postId, limit = 50, skip = 0) {
    return await Comments.find({
      postId: new mongoose.Types.ObjectId(postId),
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("userId", "firstName lastName email profilePicture");
  }
}

export const commentService = CommentService.getInstance();
