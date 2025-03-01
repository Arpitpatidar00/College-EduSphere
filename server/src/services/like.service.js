// services/like.service.js
import Like from "../database/models/like.model.js";

class LikeService {
  static instance = null;

  static getInstance() {
    if (!LikeService.instance) {
      LikeService.instance = new LikeService();
    }
    return LikeService.instance;
  }

  /**
   * Adds a user to the Like document's user array for a post
   * @param {Object} likeData - Contains postId and userId
   * @returns {Promise<Object>} The updated Like document
   */
  async likePost({ postId, userId }) {
    const like = await Like.findOneAndUpdate(
      { postId },
      {
        $addToSet: { user: userId }, // Add userId to the array if not present
        $setOnInsert: { isActive: true }, // Set isActive only on document creation
      },
      {
        upsert: true, // Create a new Like document if it doesn’t exist
        new: true, // Return the updated document
      }
    );
    return like;
  }

  /**
   * Removes a user from the Like document's user array for a post
   * @param {Object} likeData - Contains postId and userId
   * @returns {Promise<Object>} The updated Like document or null if not found
   */
  async unlikePost({ postId, userId }) {
    const like = await Like.findOneAndUpdate(
      { postId, user: userId }, // Ensure the userId exists in the array
      {
        $pull: { user: userId }, // Remove userId from the array
      },
      {
        new: true, // Return the updated document
      }
    );

    // If the user array is empty after removal, optionally deactivate or delete the document
    if (like && like.user.length === 0) {
      await Like.findByIdAndUpdate(like._id, { isActive: false });
    }

    return like;
  }

  /**
   * Gets the total number of active likes for a post
   * @param {ObjectId} postId - The post ID
   * @returns {Promise<Number>} The count of users who liked the post
   */
  async getLikeCount(postId) {
    const like = await Like.findOne({ postId, isActive: true });
    return like ? like.user.length : 0;
  }

  /**
   * Checks if a user has liked a post
   * @param {ObjectId} postId - The post ID
   * @param {ObjectId} userId - The user ID
   * @returns {Promise<Boolean>} True if the user has liked the post
   */
  async hasUserLiked(postId, userId) {
    const like = await Like.findOne({ postId, isActive: true });
    return like ? like.user.includes(userId) : false;
  }
}

export const likeService = LikeService.getInstance();
