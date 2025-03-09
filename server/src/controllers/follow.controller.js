import FollowService from "../services/follow.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { FOLLOW_STATUS } from "../constants/enum.js";

export async function toggleFollowController(req, res, next) {
  try {
    const { userId, status } = req.body;
    console.log("userId, status: ", userId, status);
    const currentUserId = req.user._id;

    if (userId === currentUserId) {
      return BAD(res, "You cannot follow yourself.");
    }

    let result, message;
    if (
      status === FOLLOW_STATUS.FOLLOWING ||
      status === FOLLOW_STATUS.PENDING ||
      status === FOLLOW_STATUS.REQUESTED
    ) {
      result = await FollowService.followUser(currentUserId, userId, status);
      message = "User followed successfully.";
    } else if (status === null) {
      result = await FollowService.unfollowUser(currentUserId, userId);
      message = "User unfollowed successfully.";
    } else {
      return BAD(res, "Invalid status.");
    }

    return OK(res, result, message);
  } catch (error) {
    next(error);
  }
}

// Get followers
export async function getFollowersController(req, res, next) {
  try {
    const { userId } = req.params;
    const followers = await FollowService.getFollowers(userId);
    return OK(res, followers, "Followers retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

// Get following
export async function getFollowingController(req, res, next) {
  try {
    const { userId } = req.params;
    const following = await FollowService.getFollowing(userId);
    return OK(res, following, "Following users retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

// Block user
export async function blockUserController(req, res, next) {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const result = await FollowService.blockUser(currentUserId, userId);
    if (!result) {
      return BAD(res, "User is already blocked.");
    }

    return OK(res, result, "User blocked successfully.");
  } catch (error) {
    next(error);
  }
}
