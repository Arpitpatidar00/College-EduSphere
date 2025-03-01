// utils/postAggregationPipeline.js

/**
 * Generates an aggregation pipeline for posts with user, likes, and comments
 * @param {Object} matchQuery - Initial match conditions (e.g., userId filter)
 * @returns {Array} Aggregation pipeline stages
 */
function generatePostAggregationPipeline(matchQuery = {}) {
  return [
    { $match: matchQuery },
    // Lookup for User (post creator)
    {
      $lookup: {
        from: "studentmodels",
        localField: "userId",
        foreignField: "_id",
        as: "studentUser",
      },
    },
    {
      $unwind: {
        path: "$studentUser",
        preserveNullAndEmptyArrays: true,
      },
    },

    // Lookup for College User
    {
      $lookup: {
        from: "collegemodels",
        localField: "userId",
        foreignField: "_id",
        as: "collegeUser",
      },
    },
    {
      $unwind: {
        path: "$collegeUser",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $addFields: {
        user: {
          $cond: {
            if: { $ne: ["$studentUser", {}] },
            then: "$studentUser",
            else: "$collegeUser",
          },
        },
      },
    },
    // Lookup for Likes
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "likes",
      },
    },
    {
      $unwind: {
        path: "$likes",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "studentmodels",
        localField: "comments.userId",
        foreignField: "_id",
        as: "comments.user",
      },
    },
    {
      $unwind: {
        path: "$comments.user",
        preserveNullAndEmptyArrays: true,
      },
    },
    // Group to reconstruct the document
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        description: { $first: "$description" },
        postType: { $first: "$postType" },
        media: { $first: "$media" },
        coverImage: { $first: "$coverImage" },
        userId: { $first: "$userId" },
        tags: { $first: "$tags" },
        achievements: { $first: "$achievements" },
        projectDetails: { $first: "$projectDetails" },
        hackathonsDetails: { $first: "$hackathonsDetails" },
        eventDetails: { $first: "$eventDetails" },
        eventDate: { $first: "$eventDate" },
        location: { $first: "$location" },
        totalLikes: { $first: "$totalLikes" },
        totalViews: { $first: "$totalViews" },
        totalComments: { $first: "$totalComments" },
        shareCount: { $first: "$shareCount" },
        rank: { $first: "$rank" },
        trending: { $first: "$trending" },
        isActive: { $first: "$isActive" },
        category: { $first: "$category" },
        uiTheme: { $first: "$uiTheme" },
        isFeatured: { $first: "$isFeatured" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        user: { $first: "$user" },
        likes: { $first: "$likes" },
        comments: {
          $push: {
            _id: "$comments._id",
            comment: "$comments.comment",
            userId: "$comments.userId",
            user: {
              _id: "$comments.user._id",
              firstName: "$comments.user.firstName",
              lastName: "$comments.user.lastName",
              email: "$comments.user.email",
              profilePicture: "$comments.user.profilePicture",
            },
            createdAt: "$comments.createdAt",
            isActive: "$comments.isActive",
          },
        },
      },
    },
    // Final projection
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        postType: 1,
        media: 1,
        coverImage: 1,
        userId: 1,
        tags: 1,
        achievements: 1,
        projectDetails: 1,
        hackathonsDetails: 1,
        eventDetails: 1,
        eventDate: 1,
        location: 1,
        totalLikes: 1,
        totalViews: 1,
        totalComments: 1,
        shareCount: 1,
        rank: 1,
        trending: 1,
        isActive: 1,
        category: 1,
        uiTheme: 1,
        isFeatured: 1,
        createdAt: 1,
        updatedAt: 1,
        "user._id": 1,
        "user.firstName": 1,
        "user.lastName": 1,
        "user.email": 1,
        "user.profilePicture": 1,
        "user.collegeId": 1,
        "user.course": 1,
        "user.verified": 1,
        "user.role": 1,
        "user.bio": 1,
        "user.location": 1,
        "user.website": 1,
        "user.dateJoined": 1,
        likes: 1,
        comments: 1,
      },
    },
  ];
}

export { generatePostAggregationPipeline };
