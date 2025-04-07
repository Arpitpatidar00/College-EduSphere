import { collegeService } from "../services/college.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";
import { ObjectId } from "mongodb";

export async function updateCollegeController(req, res, next) {
  try {
    const collegeId = req.user._id;
    const updateData = { ...req.body };

    if (req.files?.profilePicture) {
      updateData.profilePicture = req.files.profilePicture[0].path;
    }

    // Define allowed fields based on college schema
    const allowedFields = [
      "institutionName",
      "email",
      "bio",
      "websiteURL",
      "contactEmail",
      "contactPhone",
      "location", // Note: not in schema, remove if unintended
      "socialLinks.twitter",
      "socialLinks.instagram",
      "socialLinks.linkedin",
      "socialLinks.facebook",
      "socialLinks.youtube",
      "profilePicture",
      "stateId",
      "cityId",
      "pinCode",
      "countryId",
    ];

    // Fetch the existing college
    const existingCollege = await collegeService.findOne(collegeId);
    if (!existingCollege) {
      return BAD(res, null, "College not found.");
    }

    // Filter update data based on allowed fields
    const filteredUpdateData = filterUpdateData(updateData, allowedFields);

    // Validate required fields
    const validationError = validateUpdateData(filteredUpdateData);
    if (validationError) {
      return BAD(res, null, validationError);
    }

    // Check if there's anything to update
    if (Object.keys(filteredUpdateData).length === 0) {
      return BAD(res, null, "No valid fields provided for update.");
    }

    // Merge existing data with new data
    const mergedUpdateData = mergeCollegeData(
      existingCollege,
      filteredUpdateData
    );

    // Update the college via service
    const updatedCollege = await collegeService.updateCollege(
      collegeId,
      mergedUpdateData
    );
    if (!updatedCollege) {
      return BAD(res, null, "Failed to update college.");
    }

    return OK(
      res,
      { user: updatedCollege },
      "College profile updated successfully."
    );
  } catch (error) {
    next(error);
  }
}

// Helper function to filter update data
function filterUpdateData(updateData, allowedFields) {
  const filtered = {};

  // Handle top-level fields and nested fields explicitly
  allowedFields.forEach((field) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      if (updateData[parent] && updateData[parent][child] !== undefined) {
        filtered[parent] = filtered[parent] || {};
        filtered[parent][child] = updateData[parent][child];
      }
    } else if (updateData[field] !== undefined) {
      filtered[field] = updateData[field];
    }
  });

  // Explicitly handle socialLinks as an object if provided
  if (updateData.socialLinks && typeof updateData.socialLinks === "object") {
    filtered.socialLinks = filtered.socialLinks || {};
    Object.assign(filtered.socialLinks, updateData.socialLinks);
  }

  return filtered;
}

// Helper function for validation
function validateUpdateData(data) {
  if (data.institutionName === "") {
    return "Institution name cannot be empty.";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Invalid email format.";
  }
  return null;
}

// Helper function to merge existing college data with updates
function mergeCollegeData(existingCollege, updateData) {
  const mergedData = {};
  const collegeData = existingCollege.toObject(); // Convert Mongoose doc to plain object

  // Merge top-level fields
  Object.assign(mergedData, collegeData, updateData);

  // Handle nested socialLinks
  if (updateData.socialLinks) {
    mergedData.socialLinks = Object.assign(
      {},
      collegeData.socialLinks || {}, // Fallback to empty object if undefined
      updateData.socialLinks
    );
  }

  return mergedData;
}

// Existing getAllCollegeController (unchanged)
export async function getAllCollegeController(req, res, next) {
  try {
    const queryParams = req.query;
    const matchQuery = {};

    if (queryParams.searchTerm && typeof queryParams.searchTerm === "string") {
      matchQuery.$or = [
        { name: { $regex: queryParams.searchTerm, $options: "i" } },
      ];
    }

    if (queryParams?.collegeId) {
      try {
        matchQuery.collegeId = new ObjectId(queryParams.collegeId);
      } catch (error) {
        return BAD(res, null, "Invalid collegeId format", error);
      }
    }

    let pipeline = [{ $match: matchQuery }];
    pipeline = generateAggregationPipeline(queryParams, pipeline, "updatedAt");

    const [college] = await collegeService.findAll(pipeline);
    return OK(res, college, "Colleges retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

export default { updateCollegeController, getAllCollegeController };
