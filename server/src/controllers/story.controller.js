import StoryService from "../services/story.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";
import { mongoose } from "mongoose";
import Follow from "../database/models/follow.model.js"; // Adjust path as needed
import Student from "../database/models/student.model.js"; // Adjust path as needed
import { UserType } from "../constants/enum.js";

export async function createOrUpdateStoryController(req, res, next) {
  try {
    const { creatorType, privacy, mediaType, caption } = req.body;
    const userId = req.user._id;
    const mediaUrl = req.files.media[0].path;

    if (!mediaUrl) return BAD(res, "Media is required");

    const story = await StoryService.createOrUpdateStory({
      userId,
      creatorType,
      mediaUrl,
      mediaType,
      caption,
      privacy,
    });

    return OK(res, story, "Story media added successfully");
  } catch (error) {
    next(error);
  }
}

export async function getAllStoriesController(req, res, next) {
  try {
    const { queryParams } = req.query;
    const userId = req.user?._id;
    const userRole = req.user?.role;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return BAD(res, "Invalid user ID");
    }

    const followDoc = await Follow.findOne({ userId }, { following: 1 }).lean();
    const followingIds = (followDoc?.following || [])
      .filter((f) => f.status === "following" && f.user)
      .map((f) => f.user.toString());

    let userCollegeId = null;
    if (userRole === UserType.STUDENT) {
      const student = await Student.findById(userId, { collegeId: 1 }).lean();
      userCollegeId = student?.collegeId?.toString();
    }

    const matchQuery = {
      isActive: true,
      expiresAt: { $gt: new Date() },
      $or: [
        { privacy: "public" },
        {
          $and: [
            { privacy: "followers" },
            {
              userId: {
                $in: [
                  ...followingIds.map((id) => new mongoose.Types.ObjectId(id)),
                  userId,
                ],
              },
            },
          ],
        },
        {
          $and: [
            { privacy: "collegeOnly" },
            {
              $or: [
                { userId: userId },
                {
                  $expr: {
                    $and: [
                      { $eq: ["$creatorType", "college"] },
                      { $eq: [userRole, "student"] },
                      {
                        $eq: [
                          "$userId",
                          userCollegeId
                            ? new mongoose.Types.ObjectId(userCollegeId)
                            : null,
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    let pipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "students",
          localField: "userId",
          foreignField: "_id",
          as: "studentUser",
        },
      },
      {
        $lookup: {
          from: "colleges",
          localField: "userId",
          foreignField: "_id",
          as: "collegeUser",
        },
      },
      {
        $addFields: {
          userData: {
            $cond: {
              if: { $gt: [{ $size: "$studentUser" }, 0] },
              then: {
                $let: {
                  vars: { user: { $arrayElemAt: ["$studentUser", 0] } },
                  in: {
                    _id: "$$user._id",
                    firstName: "$$user.firstName",
                    lastName: "$$user.lastName",
                    profilePicture: "$$user.profilePicture",
                    bio: "$$user.bio",
                    location: "$$user.location",
                    website: "$$user.website",
                    role: "student",
                    collegeId: "$$user.collegeId",
                    interest: "$$user.interest",
                    socialLinks: "$$user.socialLinks",
                    collegeVerified: "$$user.collegeVerified",
                  },
                },
              },
              else: {
                $let: {
                  vars: { user: { $arrayElemAt: ["$collegeUser", 0] } },
                  in: {
                    _id: "$$user._id",
                    name: "$$user.name",
                    profilePicture: "$$user.profilePicture",
                    bio: "$$user.bio",
                    location: "$$user.location",
                    website: "$$user.website",
                    role: "college",
                    verified: "$$user.verified",
                  },
                },
              },
            },
          },
        },
      },
      {
        $unset: ["studentUser", "collegeUser"],
      },
      {
        $project: {
          viewers: 0,
          __v: 0,
        },
      },
      {
        $group: {
          _id: "$userId",
          userData: { $first: "$userData" },
          stories: {
            $push: {
              _id: "$_id",
              creatorType: "$creatorType",
              media: "$media",
              privacy: "$privacy",
              isActive: "$isActive",
              viewsCount: "$viewsCount",
              createdAt: "$createdAt",
              expiresAt: "$expiresAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      },
    ];

    pipeline = generateAggregationPipeline(queryParams, pipeline, "updatedAt");

    const [groupedStories] = await StoryService.findAll(pipeline);

    return OK(res, groupedStories, "Grouped stories fetched");
  } catch (error) {
    next(error);
  }
}

export async function getStoryController(req, res, next) {
  try {
    const { id } = req.params;
    const story = await StoryService.getById(id);
    if (!story) return BAD(res, "Story not found");
    return OK(res, story, "Story retrieved successfully");
  } catch (error) {
    next(error);
  }
}

export async function deleteStoryController(req, res, next) {
  try {
    const { id } = req.params;
    const story = await StoryService.deleteStory(id);
    if (!story) return BAD(res, "Story not found");
    return OK(res, story, "Story deleted successfully");
  } catch (error) {
    next(error);
  }
}

export async function deleteMediaController(req, res, next) {
  try {
    const { id, mediaIndex } = req.params;
    const userId = req.user._id;
    const story = await StoryService.deleteMedia(
      id,
      parseInt(mediaIndex),
      userId
    );
    if (!story) return BAD(res, "Story or media not found");
    return OK(res, story, "Media deleted successfully");
  } catch (error) {
    next(error);
  }
}

export async function addStoryViewController(req, res, next) {
  try {
    const { id } = req.params;
    const { mediaIndex } = req.body;
    const userId = req.user._id;
    const story = await StoryService.addView(id, userId, mediaIndex);
    if (!story) return BAD(res, "Story not found");
    return OK(res, story, "Story view added");
  } catch (error) {
    next(error);
  }
}

export async function addStoryReactionController(req, res, next) {
  try {
    const { id } = req.params;
    const { type, mediaIndex } = req.body;
    const userId = req.user._id;
    const story = await StoryService.addReaction(id, userId, type, mediaIndex);
    if (!story) return BAD(res, "Story not found");
    return OK(res, story, "Reaction added");
  } catch (error) {
    next(error);
  }
}

export async function removeStoryReactionController(req, res, next) {
  try {
    const { id } = req.params;
    const { mediaIndex } = req.body;
    const userId = req.user._id;
    const story = await StoryService.removeReaction(id, userId, mediaIndex);
    if (!story) return BAD(res, "Story not found");
    return OK(res, story, "Reaction removed");
  } catch (error) {
    next(error);
  }
}

export async function getStoryViewsController(req, res, next) {
  try {
    const { id } = req.params;
    const views = await StoryService.getViews(id);
    if (!views) return BAD(res, "Story not found");
    return OK(res, views, "Story views retrieved successfully");
  } catch (error) {
    next(error);
  }
}
