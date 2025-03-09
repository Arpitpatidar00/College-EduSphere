import { FOLLOW_STATUS } from "../constants/enum.js";
import Follow from "../database/models/follow.model.js"; // Adjust path as needed
import { mongoose } from "mongoose";

class FollowService {
  static instance = null;

  static getInstance() {
    if (!FollowService.instance) {
      FollowService.instance = new FollowService();
    }
    return FollowService.instance;
  }

  async createFollowDocument(userId) {
    let followDoc = await Follow.findOne({ userId });

    if (!followDoc) {
      followDoc = new Follow({
        userId,
        followers: [],
        following: [],
        blacklist: [],
      });
      await followDoc.save();
    }

    return followDoc;
  }
  async followUser(currentUserId, userId, status) {
    console.log("status: ", status);
    if (currentUserId === userId) return null;

    const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const followDoc = await Follow.findOneAndUpdate(
      { userId: currentUserObjectId },
      {
        $addToSet: {
          following: {
            user: userObjectId,
            status,
            followedAt: new Date(),
          },
        },
      },
      { upsert: true, new: true }
    );

    await Follow.findOneAndUpdate(
      { userId: userObjectId },
      {
        $addToSet: {
          followers: {
            user: currentUserObjectId,
            status,
            followedAt: new Date(),
          },
        },
      },
      { upsert: true }
    );

    return followDoc;
  }

  async acceptFollowRequest(currentUserId, userId) {
    await Follow.findOneAndUpdate(
      { userId: currentUserId, "followers.user": userId },
      { $set: { "followers.$.status": FOLLOW_STATUS.FOLLOWING } }
    );

    // await Follow.findOneAndUpdate(
    //   { userId: userId, "following.user": currentUserId },
    //   { $set: { "following.$.status": "following" } }
    // );

    return { message: "Follow request accepted!" };
  }

  async unfollowUser(currentUserId, userId) {
    if (currentUserId === userId) return null;

    const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Remove from following list
    const followDoc = await Follow.findOneAndUpdate(
      { userId: currentUserObjectId },
      {
        $pull: { following: { user: userObjectId } },
      },
      { new: true }
    );

    // Remove from followers list
    await Follow.findOneAndUpdate(
      { userId: userId },
      {
        $pull: { followers: { user: currentUserObjectId } },
      },
      { new: true }
    );

    return followDoc;
  }

  async getFollowers(userId) {
    const followDoc = await Follow.findOne({ userId }).populate(
      "followers.user",
      "username email profilePicture"
    );
    return followDoc ? followDoc.followers.map((f) => f.user) : [];
  }

  async getFollowing(userId) {
    const followDoc = await Follow.findOne({ userId }).populate(
      "following.user",
      "username email profilePicture"
    );
    return followDoc ? followDoc.following.map((f) => f.user) : [];
  }

  async blockUser(currentUserId, userId) {
    if (currentUserId === userId) return null; // Prevent self-blocking

    const followDoc = await this.createFollowDocument(currentUserId);

    if (followDoc.blacklist.some((b) => b.user.toString() === userId)) {
      return null;
    }

    followDoc.blacklist.push({ user: userId });

    followDoc.following = followDoc.following.filter(
      (f) => f.user.toString() !== userId
    );
    followDoc.followers = followDoc.followers.filter(
      (f) => f.user.toString() !== userId
    );

    await followDoc.save();
    return followDoc;
  }
  async findAll(pipeline = []) {
    return Follow.aggregate(pipeline);
  }
}

export default FollowService.getInstance();
