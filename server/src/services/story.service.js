import mongoose from "mongoose";
import StoryModel from "../database/models/story.model.js";

class StoryService {
  static instance = null;
  static getInstance() {
    if (!StoryService.instance) {
      StoryService.instance = new StoryService();
    }
    return StoryService.instance;
  }

  async createOrUpdateStory({
    userId,
    creatorType,
    mediaUrl,
    mediaType,
    caption,
    privacy,
  }) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    // Find existing active story for the user
    let story = await StoryModel.findOne({
      userId,
      creatorType,
      expiresAt: { $gt: new Date() },
      isActive: true,
    });

    const newMedia = {
      mediaUrl,
      mediaType,
      caption,
      order: story ? story.media.length : 0,
    };

    if (story) {
      // Update existing story by adding new media
      story.media.push(newMedia);
      // Reset expiration to 24 hours from now
      story.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      return story.save();
    }

    // Create new story if none exists
    story = new StoryModel({
      userId,
      creatorType,
      media: [newMedia],
      privacy,
    });

    return story.save();
  }

  async findAll(pipeline = []) {
    return StoryModel.aggregate(pipeline);
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid story ID");
    }
    return StoryModel.findOne({ _id: id, isActive: true })
      .populate("viewers.userId", "username _id")
      .populate("reactions.userId", "username _id");
  }

  async deleteStory(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid story ID");
    }
    return StoryModel.findOneAndUpdate(
      { _id: id, isActive: true },
      { isActive: false },
      { new: true }
    );
  }

  async deleteMedia(storyId, mediaIndex, userId) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new Error("Invalid story ID");
    }

    const story = await StoryModel.findOne({
      _id: storyId,
      userId,
      isActive: true,
    });

    if (!story || mediaIndex >= story.media.length) return null;

    story.media.splice(mediaIndex, 1);

    // Reorder remaining media items
    story.media.forEach((item, idx) => {
      item.order = idx;
    });

    // Remove reactions and views for deleted media
    story.reactions = story.reactions.filter(
      (r) => r.mediaIndex !== mediaIndex
    );
    story.viewers = story.viewers.filter((v) => v.mediaIndex !== mediaIndex);

    // Adjust remaining indices
    story.reactions.forEach((r) => {
      if (r.mediaIndex > mediaIndex) r.mediaIndex--;
    });
    story.viewers.forEach((v) => {
      if (v.mediaIndex > mediaIndex) v.mediaIndex--;
    });

    return story.media.length > 0 ? story.save() : this.deleteStory(storyId);
  }

  async addView(storyId, userId, mediaIndex) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new Error("Invalid story ID");
    }
    const story = await StoryModel.findOne({ _id: storyId, isActive: true });
    if (!story || mediaIndex >= story.media.length) return null;

    return StoryModel.findByIdAndUpdate(
      storyId,
      {
        $addToSet: {
          viewers: {
            userId,
            mediaIndex,
            viewedAt: new Date(),
          },
        },
        $inc: { viewsCount: 1 },
      },
      { new: true }
    ).populate("viewers.userId", "username _id");
  }

  async addReaction(storyId, userId, type, mediaIndex) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new Error("Invalid story ID");
    }
    const story = await StoryModel.findOne({ _id: storyId, isActive: true });
    if (!story || mediaIndex >= story.media.length) return null;

    return StoryModel.findByIdAndUpdate(
      storyId,
      {
        $push: {
          reactions: {
            userId,
            type,
            mediaIndex,
            reactedAt: new Date(),
          },
        },
      },
      { new: true }
    ).populate("reactions.userId", "username _id");
  }

  async removeReaction(storyId, userId, mediaIndex) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new Error("Invalid story ID");
    }
    return StoryModel.findByIdAndUpdate(
      storyId,
      {
        $pull: {
          reactions: {
            userId,
            mediaIndex,
          },
        },
      },
      { new: true }
    ).populate("reactions.userId", "username _id");
  }

  async getViews(storyId) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new Error("Invalid story ID");
    }
    return StoryModel.findOne({ _id: storyId, isActive: true })
      .select("viewers media")
      .populate("viewers.userId", "username _id");
  }
}

export default StoryService.getInstance();
