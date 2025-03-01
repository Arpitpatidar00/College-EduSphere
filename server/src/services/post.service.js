import mongoose from "mongoose";
import PostModel from "../database/models/posts.model.js";

class PostService {
  static instance = null;
  static getInstance() {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post ID");
    }
    return PostModel.findById(id);
  }

  async findAll(pipeline = []) {
    return PostModel.aggregate(pipeline);
  }

  async create(postData) {
    const post = new PostModel(postData);
    return post.save();
  }

  async updatePost(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post ID");
    }
    return PostModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deletePost(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post ID");
    }
    return PostModel.findByIdAndDelete(id);
  }

  async toggleActiveStatus(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post ID");
    }
    const post = await PostModel.findById(id);
    if (!post) throw new Error("Post not found");
    post.isActive = !post.isActive;
    return post.save();
  }

  async likePost(postId, userId) {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid post ID");
    }
    const post = await PostModel.findById(postId);
    if (!post) throw new Error("Post not found");
    // Add userId if not already in totalLikes
    if (!post.totalLikes.includes(userId)) {
      post.totalLikes.push(userId);
      return post.save();
    }
    return post;
  }

  async unlikePost(postId, userId) {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid post ID");
    }
    const post = await PostModel.findById(postId);
    if (!post) throw new Error("Post not found");
    // Remove userId from totalLikes
    post.totalLikes = post.totalLikes.filter(
      (id) => id.toString() !== userId.toString()
    );
    return post.save();
  }

  async incrementViews(postId) {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error("Invalid post ID");
    }
    return PostModel.findByIdAndUpdate(
      postId,
      { $inc: { totalViews: 1 } },
      { new: true }
    );
  }
}

export default PostService.getInstance();
