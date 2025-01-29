import bcrypt from "bcrypt";
import User from "../database/models/users.model.js";
// import fs from "fs";
// import path from "path";
import cloudinary from "../config/cloudinary.config.js"; // Assuming your cloudinary config is here

// Change Password Service
export async function changePasswordSevice({
  email,
  oldPassword,
  newPassword,
  confirmPassword,
}) {
  try {
    if (newPassword !== confirmPassword) {
      return { data: null, error: "Passwords do not match" };
    }
    const user = await User.findOne({ email });
    if (!user) {
      return { data: null, error: "User not found" };
    }
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return { data: null, error: "Incorrect old password" };
    }
    user.password = await bcrypt.hash(newPassword, 10); // Hash new password before saving
    await user.save();
    return { data: "Password Updated successfully", error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

// Update User Details Service
export async function updateUserDetailsService(userId, updates) {
  try {
    if (!updates || Object.keys(updates).length === 0) {
      return { data: null, error: "No details provided for update" };
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!user) {
      return { data: null, error: "User not found" };
    }
    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

// Helper function to delete file
// const deleteFile = (filePath) => {
//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath); // Deletes the file
//   }
// };

// Update Profile Picture Service
export async function updateProfilePictureService(req) {
  try {
    return new Promise(async (resolve, reject) => {
      if (!req.file) {
        return reject({ data: null, error: "No file uploaded" });
      }

      const filePath = req.file.path;
      console.log(filePath);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "profile_pictures",
        public_id: `profile_picture_${req.body.userId}`,
      });
      console.log(result);
      resolve({ data: result.secure_url, error: null });
    });
  } catch (error) {
    return { data: null, error: error.message };
  }
}

//Follow a User Service
export async function followUserService(followerEmail, followingEmail) {
  try {
    const follower = await User.findOne({ email: followerEmail });
    const following = await User.findOne({ email: followingEmail });

    if (!follower || !following) {
      return { data: null, error: "One or both users not found" };
    }

    // Prevent following the same user multiple times
    if (follower.following.includes(following._id)) {
      return { data: null, error: "User is already followed" };
    }

    // Update both users: follower adds to `following`, following adds to `followers`
    follower.following.push(following._id);
    following.followers.push(follower._id);

    await follower.save();
    await following.save();

    return { data: { follower, following }, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

// Unfollow a User Service
export async function unfollowUserService(followerEmail, followingEmail) {
  try {
    const follower = await User.findOne({ email: followerEmail });
    const following = await User.findOne({ email: followingEmail });

    if (!follower || !following) {
      return { data: null, error: "One or both users not found" };
    }

    // Remove the following relationship if it exists
    follower.following = follower.following.filter(
      (userId) => !userId.equals(following._id)
    );
    following.followers = following.followers.filter(
      (userId) => !userId.equals(follower._id)
    );

    await follower.save();
    await following.save();

    return { data: { follower, following }, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
