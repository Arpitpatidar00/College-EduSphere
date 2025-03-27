import StudentService from "../services/student.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { generateAggregationPipeline } from "../utils/generatePipeline.js";
import { ObjectId } from "mongodb";
import { mongoose } from "mongoose";

export async function updateStudentController(req, res, next) {
  try {
    const updateData = { ...req.body };
    const studentId = req.user._id;

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
    // Fetch the existing user
    const existingStudent = await StudentService.findOne(studentId);
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
      studentId,
      mergedUpdateData
    );
    if (!updatedStudent) {
      return BAD(res, null, "Failed to update student.");
    }

    return OK(res, { user: updatedStudent }, "Profile updated successfully.");
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

    // 🔹 Search Query
    if (queryParams.search) {
      matchQuery.$or = [
        { name: { $regex: queryParams.search, $options: "i" } },
        { email: { $regex: queryParams.search, $options: "i" } },
      ];
    }

    // 🔹 Convert String IDs to ObjectId Safely
    try {
      if (queryParams.studentId)
        matchQuery.studentId = new ObjectId(queryParams.studentId);
      if (queryParams.collegeId)
        matchQuery.collegeId = new ObjectId(queryParams.collegeId);
    } catch (error) {
      return BAD(res, null, "Invalid ID format", error);
    }

    if (queryParams.isActive) {
      matchQuery.isActive = queryParams.isActive === "true"; // Convert string to boolean
    }
    if (queryParams.collegeVerified) {
      matchQuery.collegeVerified = queryParams.collegeVerified === "true"; // Convert string to boolean
    }
    if (queryParams.verified) {
      matchQuery.verified = queryParams.verified === "true"; // Convert string to boolean
    }

    // 🔹 Generate Aggregation Pipeline
    const pipeline = generateAggregationPipeline(
      req.query,
      [{ $match: matchQuery }],
      "updatedAt"
    );

    // 🔹 Fetch Students
    const [students] = await StudentService.findAll(pipeline);

    return OK(res, students, "Students retrieved successfully.");
  } catch (error) {
    next(error);
  }
}
export async function toggleStudentField(req, res, next) {
  try {
    const { _id } = req.params;
    const { field } = req.body;
    const studentIdModified = new mongoose.Types.ObjectId(_id);

    if (!field) {
      return BAD(res, null, "Field to toggle is required");
    }

    // Find the student
    const student = await StudentService.findOne(studentIdModified);

    if (!student || student[field] === undefined) {
      return BAD(res, null, `Field '${field}' not found for student`);
    }

    // Toggle the specified field
    const newStatus = !student[field];

    // Update the student's field
    const updatedStudent = await StudentService.updateStudentStatus(
      studentIdModified,
      {
        [field]: newStatus,
      }
    );

    if (!updatedStudent) {
      return BAD(res, null, `Failed to update student ${field} status`);
    }

    return OK(res, updatedStudent, `Student ${field} set to ${newStatus}`);
  } catch (error) {
    next(error);
  }
}

export default { updateStudentController };
