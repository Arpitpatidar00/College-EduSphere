import StudentService from "../services/student.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";
import { mongoose } from "mongoose";

export async function updateStudentController(req, res, next) {
  try {
    // const userId = req.user._id; // Assumes user is authenticated
    const updateData = { ...req.body };

    // Handle file upload (e.g., profile picture)
    if (req.files?.profilePicture) {
      updateData.profilePicture = req.files.profilePicture[0].path;
    }

    // Define allowed fields
    const allowedFields = [
      "firstName",
      "lastName",
      "interest",
      "profilePicture",
      "bio",
      "location",
      "website",
      "phoneNumber",
      "socialLinks.twitter",
      "socialLinks.instagram",
      "socialLinks.linkedin",
      "socialLinks.facebook",
      "privacySettings.visibility",
    ];
    const newuserId = new mongoose.Types.ObjectId(updateData.userId);
    // Fetch the existing user
    const existingStudent = await StudentService.findOne(newuserId);
    if (!existingStudent) {
      return BAD(res, null, "Student not found.");
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

    // Merge existing data with new data using Object.assign
    const mergedUpdateData = mergeUserData(existingStudent, filteredUpdateData);

    // Update the student via service
    const updatedStudent = await StudentService.updateUser(
      newuserId,
      mergedUpdateData
    );
    if (!updatedStudent) {
      return BAD(res, null, "Failed to update student.");
    }

    return OK(res, updatedStudent, "Profile updated successfully.");
  } catch (error) {
    next(error);
  }
}

// Helper function to filter update data
function filterUpdateData(updateData, allowedFields) {
  const filtered = {};
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        filtered[parent] = filtered[parent] || {};
        filtered[parent][child] = updateData[field];
      } else {
        filtered[field] = updateData[field];
      }
    }
  });
  return filtered;
}

// Helper function for validation
function validateUpdateData(data) {
  if (data.firstName === "" || data.lastName === "") {
    return "First name and last name cannot be empty.";
  }
  return null;
}

// Helper function to merge existing user data with updates
function mergeUserData(existingUser, updateData) {
  const mergedData = {};

  // Copy existing user data as a base
  const userData = existingUser.toObject(); // Convert Mongoose doc to plain object

  // Merge top-level fields
  Object.assign(mergedData, userData, updateData);

  // Handle nested fields (e.g., socialLinks, privacySettings)
  if (updateData.socialLinks) {
    mergedData.socialLinks = Object.assign(
      {},
      userData.socialLinks,
      updateData.socialLinks
    );
  }
  if (updateData.privacySettings) {
    mergedData.privacySettings = Object.assign(
      {},
      userData.privacySettings,
      updateData.privacySettings
    );
  }

  return mergedData;
}

export async function getAllStudentsController(req, res, next) {
  try {
    const queryParams = req.query;
    const matchQuery = {};

    // if (queryParams.searchTerm && typeof queryParams.searchTerm === "string") {
    //   matchQuery.$or = [
    //     { name: { $regex: queryParams.searchTerm, $options: "i" } },
    //     { email: { $regex: queryParams.searchTerm, $options: "i" } },
    //   ];
    // }

    // if (queryParams?.studentId) {
    //   try {
    //     matchQuery.studentId = new ObjectId(queryParams.studentId);
    //   } catch (error) {
    //     return BAD(res, null, "Invalid studentId format", error);
    //   }
    // }

    // if (queryParams?.collegeId) {
    //   try {
    //     matchQuery.collegeId = new ObjectId(queryParams.collegeId);
    //   } catch (error) {
    //     return BAD(res, null, "Invalid collegeId format", error);
    //   }
    // }

    let pipeline = [{ $match: matchQuery }];
    pipeline = generateAggregationPipeline(queryParams, pipeline, "updatedAt");

    const [students] = await StudentService.findAll(pipeline);
    return OK(res, students, "Students retrieved successfully.");
  } catch (error) {
    next(error);
  }
}

export default { updateStudentController };
