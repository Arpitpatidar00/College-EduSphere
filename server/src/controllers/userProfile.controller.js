import { ERROR, OK, UNKNOWN } from "../lib/responseHelper.js";
import {
  changePasswordSevice,
  updateUserDetailsService,
  updateProfilePictureService,
  followUserService,
  unfollowUserService,
} from "../services/userProfile.service.js";

// Change Password
export async function changePassword(req, res) {
  try {
    const { data, error } = await changePasswordSevice(req.body);
    if (error) {
      return ERROR(res, null, error);
    }
    return OK(res, data, "Password Updated Successfully");
  } catch (error) {
    return UNKNOWN(res, error.message);
  }
}

// Update User Details
export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.body.userId;
    const updates = req.body.updates;

    const { data, error } = await updateUserDetailsService(userId, updates);
    if (error) {
      return ERROR(res, null, error);
    }
    return OK(res, data, "User details updated successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update Profile Picture Controller
export const updateProfilePicture = async (req, res) => {
  try {
    const { data, error } = await updateProfilePictureService(req);
    if (error) {
      return ERROR(res, null, error);
    }
    return OK(res, data, "Profile picture updated successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Follow a User
export const followUser = async (req, res) => {
  try {
    const { followerEmail, followingEmail } = req.body; // Emails of the users involved

    const { data, error } = await followUserService(
      followerEmail,
      followingEmail
    );
    if (error) {
      return ERROR(res, null, error);
    }
    return OK(res, data, "User followed successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Unfollow a User
export const unfollowUser = async (req, res) => {
  try {
    const { followerEmail, followingEmail } = req.body; // Emails of the users involved

    const { data, error } = await unfollowUserService(
      followerEmail,
      followingEmail
    );
    if (error) {
      return ERROR(res, null, error);
    }
    return OK(res, data, "User unfollowed successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
