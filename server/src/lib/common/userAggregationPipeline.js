/**
 * Generates an aggregation pipeline for fetching user follow details
 * @param {Object} matchQuery - Initial match conditions (e.g., userId filter)
 * @returns {Array} Aggregation pipeline stages
 */
export const getFollowLookupPipeline = (matchQuery) => [
  { $match: matchQuery },
  {
    $lookup: {
      from: "follows",
      localField: "userId",
      foreignField: "userId",
      as: "followData",
    },
  },
  {
    $unwind: {
      path: "$followData",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $project: {
      _id: 1,
      followers: "$followData.followers",
      following: "$followData.following",
      blacklist: "$followData.blacklist",
    },
  },
];
