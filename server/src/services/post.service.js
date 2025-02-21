import Post from "../database/models/posts.model.js";
import User from "../database/models/student.model.js";
import fs from "fs";
import path from "path";

export const createPostService = async (postData) => {
  try {
    const newPost = new Post(postData);
    await newPost.save(); // Save the post with the image URL
    return { data: newPost, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Helper function to delete a file
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath); // Deletes the file
  }
};

// Delete Post Service using findByIdAndDelete
export async function deletePostService(postId, userId) {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return { data: null, error: "Post not found" };
    }

    // Ensure the user is the owner of the post
    if (post.postOwner !== userId) {
      return {
        data: null,
        error: "You are not authorized to delete this post",
      };
    }

    // Delete the image file from the uploads folder
    if (post.postImage) {
      const imagePath = path.resolve(__dirname, "../../", post.postImage);
      deleteFile(imagePath); // Delete the image
    }

    // Remove the postId from the user's posts array
    const user = await User.findById(userId);
    if (!user) {
      return { data: null, error: "User not found" };
    }

    user.posts = user.posts.filter((post) => post.toString() !== postId);
    await user.save();

    // Delete the post using findByIdAndDelete
    await Post.findByIdAndDelete(postId);

    return { data: "Post deleted successfully", error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
