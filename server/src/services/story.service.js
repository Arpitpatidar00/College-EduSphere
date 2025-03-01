// services/story.service.js
import mongoose from "mongoose";
import StoryModel from "../database/models/stories.model.js";

class StoryService {
  static instance = null;

  static getInstance() {
    if (!StoryService.instance) {
      StoryService.instance = new StoryService();
    }
    return StoryService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid story ID");
    }
    const story = await StoryModel.findOne({
      _id: id,
      expiresAt: { $gt: new Date() }, // Ensure story hasn't expired
    });
    return story;
  }

  async findAll(pipeline = []) {
    return StoryModel.aggregate(pipeline);
  }

  async create(storyData) {
    const story = new StoryModel(storyData);
    return story.save();
  }

  async deleteStory(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid story ID");
    }
    const story = await StoryModel.findOne({
      _id: id,
      userId,
      expiresAt: { $gt: new Date() },
    });
    if (!story) {
      return null; // Either not found or not owned by user
    }
    return StoryModel.findByIdAndDelete(id);
  }

  async viewStory(storyId, userId) {
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      throw new Error("Invalid story ID");
    }
    const story = await StoryModel.findOne({
      _id: storyId,
      expiresAt: { $gt: new Date() },
    });
    if (!story) {
      return null; // Story not found or expired
    }
    if (!story.viewers.includes(userId)) {
      story.viewers.push(userId);
      return story.save();
    }
    return story;
  }

  // Optional: Clean up expired stories (could be run via a cron job)
  async cleanExpiredStories() {
    return StoryModel.deleteMany({ expiresAt: { $lte: new Date() } });
  }
}

export default StoryService.getInstance();
