import PostService from "../services/post.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";
import { mongoose } from "mongoose";
import { generatePostAggregationPipeline } from "../lib/common/postAggregationPipeline.js";

export async function createPostController(req, res, next) {
  try {
    var postData = req.body;
    const userId = req.user;

    if (req.files && req.files.coverImage) {
      postData.coverImage = req.files.coverImage[0].path;
    }
    if (req.files && req.files.media) {
      postData.media = req.files.media.map((file) => file.path);
    }
    postData = {
      ...postData,
      userId,
    };

    const post = await PostService.create(postData);
    return OK(res, post, "Post created successfully.");
  } catch (error) {
    next(error);
  }
}
export async function getAllPostsController(req, res, next) {
  try {
    const { userId, ...queryParams } = req.query;

    const matchQuery = {};
    if (userId) {
      matchQuery.userId = new mongoose.Types.ObjectId(userId);
    }

    let pipeline = generatePostAggregationPipeline(matchQuery);

    pipeline = generateAggregationPipeline(queryParams, pipeline, "updatedAt");

    const [posts] = await PostService.findAll(pipeline);

    return OK(res, posts, "Posts retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

export async function getPostController(req, res, next) {
  try {
    const { id } = req.params;
    const post = await PostService.findOne(id);
    if (!post) {
      return BAD(res, "Post not found.");
    }
    return OK(res, post, "Post retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

export async function updatePostController(req, res, next) {
  try {
    const { id } = req.params;
    let updateData = req.body;
    if (req.files && req.files.coverImage) {
      updateData.coverImage = req.files.coverImage[0].filename;
    }
    if (req.files && req.files.media) {
      updateData.media = req.files.media.map((file) => file.filename);
    }
    const updatedPost = await PostService.updatePost(id, updateData);
    if (!updatedPost) {
      return BAD(res, "Post not found");
    }
    return OK(res, updatedPost, "Post updated successfully.");
  } catch (error) {
    next(error);
  }
}

// Delete a post
export async function deletePostController(req, res, next) {
  try {
    const { id } = req.params;
    const deletedPost = await PostService.deletePost(id);
    if (!deletedPost) {
      return BAD(res, "Post not found.");
    }
    return OK(res, deletedPost, "Post deleted successfully.");
  } catch (error) {
    next(error);
  }
}

// Toggle active status for a post
export async function togglePostActiveStatusController(req, res, next) {
  try {
    const { id } = req.params;
    const toggledPost = await PostService.toggleActiveStatus(id);
    if (!toggledPost) {
      return BAD(res, "Post not found.");
    }
    return OK(res, toggledPost, "Post active status toggled successfully.");
  } catch (error) {
    next(error);
  }
}

// Like a post
export async function likePostController(req, res, next) {
  try {
    const { id } = req.params; // post id
    const userId = req.user.id;
    const post = await PostService.likePost(id, userId);
    return OK(res, post, "Post liked successfully.");
  } catch (error) {
    next(error);
  }
}

// Unlike a post
export async function unlikePostController(req, res, next) {
  try {
    const { id } = req.params; // post id
    const userId = req.user.id;
    const post = await PostService.unlikePost(id, userId);
    return OK(res, post, "Post unliked successfully.");
  } catch (error) {
    next(error);
  }
}

// Increment view count for a post
export async function incrementPostViewController(req, res, next) {
  try {
    const { id } = req.params; // post id
    const post = await PostService.incrementViews(id);
    return OK(res, post, "Post view incremented.");
  } catch (error) {
    next(error);
  }
}
