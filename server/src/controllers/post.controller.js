import {
  createPostService,
  deletePostService,
} from "../services/post.service.js";
import { ERROR, OK } from "../lib/responseHelper.js";

export const createPost = async (req, res, next) => {
  try {
    const { postDescription } = req.body;
    const userId = req.body.userId;

    const postImage = req.file ? req.file.path : null;

    const postData = {
      postOwner: userId,
      postDescription: postDescription,
      postImage: postImage,
    };

    const { data, error } = await createPostService(postData, userId);
    if (error) {
      return ERROR(res, null, error);
    }

    return OK(res, data, "Post created successfully");
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
