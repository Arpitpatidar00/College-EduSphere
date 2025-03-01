// controllers/story.controller.js
import StoryService from "../services/story.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";

export async function createStoryController(req, res, next) {
  try {
    const userId = req.user.id; // Assuming authMiddleware sets req.user
    let storyData = req.body;

    if (req.files && req.files.media) {
      storyData.media = req.files.media.map((file, index) => ({
        url: file.path,
        type: file.mimetype.startsWith("image") ? "image" : "video",
        order: index,
      }));
    }

    storyData = {
      ...storyData,
      userId,
    };

    const story = await StoryService.create(storyData);
    return OK(res, story, "Story created successfully.");
  } catch (error) {
    next(error);
  }
}

export async function getAllStoriesController(req, res, next) {
  try {
    const queryParams = req.query;
    const userId = req.user._id;

    const matchQuery = {
      expiresAt: { $gt: new Date() }, // Only active (non-expired) stories
    };

    let pipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "users", // Adjust based on your User model collection name
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          media: 1,
          caption: 1,
          expiresAt: 1,
          viewers: 1,
          createdAt: 1,
          updatedAt: 1,
          "user._id": 1,
          "user.firstName": 1,
          "user.lastName": 1,
          "user.profilePicture": 1,
        },
      },
    ];

    pipeline = generateAggregationPipeline(queryParams, pipeline, "createdAt");

    const stories = await StoryService.findAll(pipeline);
    return OK(res, stories, "Stories retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

export async function getStoryController(req, res, next) {
  try {
    const { id } = req.params;
    const story = await StoryService.findOne(id);
    if (!story) {
      return BAD(res, null, "Story not found or expired.");
    }
    return OK(res, story, "Story retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

export async function deleteStoryController(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deletedStory = await StoryService.deleteStory(id, userId);
    if (!deletedStory) {
      return BAD(res, null, "Story not found or unauthorized.");
    }
    return OK(res, deletedStory, "Story deleted successfully.");
  } catch (error) {
    next(error);
  }
}

export async function viewStoryController(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const story = await StoryService.viewStory(id, userId);
    if (!story) {
      return BAD(res, null, "Story not found or expired.");
    }
    return OK(res, story, "Story viewed successfully.");
  } catch (error) {
    next(error);
  }
}
