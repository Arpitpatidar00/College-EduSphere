import {
  createPostService,
  deletePostService,
} from "../services/post.service.js";
import { ERROR, OK } from "../lib/responseHelper.js";
import cloudinary from "../config/cloudinary.config.js"; // Import Cloudinary config

export const createPost = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded!" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts",
      public_id: `post_image_${Date.now()}`,
    });

    const postData = {
      postImage: result.secure_url, // Store Cloudinary's secure URL
    };

    const { data, error } = await createPostService(postData);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const { data, error } = await deletePostService(postId, userId);
    if (error) {
      return ERROR(res, null, error);
    }

    return OK(res, null, data);
  } catch (error) {
    next(error);
  }
};
