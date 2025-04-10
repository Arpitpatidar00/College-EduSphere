import StudentService from "../services/student.service.js";
import AuthService from "../services/auth/auth.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { UserType } from "../constants/enum.js";
import FollowService from "../services/follow.service.js";

import mongoose from "mongoose";
import { getFollowLookupPipeline } from "../lib/common/userAggregationPipeline.js";

export async function signupController(req, res, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      courseId,
      collegeId,
      enrollmentId,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !courseId ||
      !collegeId ||
      !enrollmentId
    ) {
      return BAD(
        res,
        "All fields (firstName, lastName, email, password, courseId, collegeId, enrollmentId) are required."
      );
    }

    const existingUser = await StudentService.findBy("email", email);
    if (existingUser) {
      return BAD(res, "A user with this email already exists.");
    }

    // Convert only valid ObjectIds
    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    const userData = {
      firstName,
      lastName,
      email,
      password,
      courseId: isValidObjectId(courseId)
        ? new mongoose.Types.ObjectId(courseId)
        : null,
      collegeId: isValidObjectId(collegeId)
        ? new mongoose.Types.ObjectId(collegeId)
        : null,
      enrollmentId,
    };

    if (!userData.courseId || !userData.collegeId) {
      return BAD(res, "Invalid courseId or collegeId format.");
    }

    const { user, token } = await AuthService.signupWithEmail(
      userData,
      UserType.STUDENT
    );

    if (!user || !token) {
      return BAD(res, "Failed to create user.");
    }

    const followCollection = await FollowService.createFollowDocument(user._id);

    const updateData = {
      follow: followCollection._id,
    };

    const updatedStudent = await StudentService.updateUser(user.id, updateData);

    return OK(
      res,
      { token, user: updatedStudent },
      "User created successfully."
    );
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
}
export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return BAD(res, "Email, password are required.");
    }

    const { token, user } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
      UserType.STUDENT
    );

    if (!user || !token) {
      return BAD(res, "Failed to login.");
    }

    // Convert `user` to a plain object
    const userObject = user.toObject ? user.toObject() : user;

    // Ensure ObjectId for match query
    const matchQuery = { userId: new mongoose.Types.ObjectId(user._id) };

    // Get follow data using aggregation
    const followData = await FollowService.findAll(
      getFollowLookupPipeline(matchQuery)
    );

    // Structure the response properly
    userObject.follow = followData[0] || {}; // Attach follow data to user object

    return OK(res, { user: userObject, token }, "Login successful.");
  } catch (error) {
    next(error);
  }
}
export async function verifyEmailController(req, res, next) {
  const { token } = req.query;
  if (!token) {
    return BAD(res, "Email and verification code are required.");
  }

  try {
    const { user } = await AuthService.verifyEmail(token, UserType.STUDENT);

    if (!user) {
      return BAD(res, "Failed to verify email.");
    }
    return OK(res, null, "Email verified successfully.");
  } catch (error) {
    next(error);
  }
}
export async function forgotPasswordController(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return BAD(res, "Email is required.");
  }

  try {
    const result = await AuthService.forgotPassword(email, UserType.STUDENT);

    if (result) {
      return OK(res, null, result.message);
    }

    return BAD(res, "Error sending password reset link.");
  } catch (error) {
    next(error);
  }
}
export async function resetPasswordController(req, res, next) {
  const { newPassword } = req.body;
  const { token } = req.query;

  if (!token || !newPassword) {
    return BAD(res, " token, and new password are required.");
  }

  try {
    const user = await AuthService.resetPassword(
      newPassword,
      UserType.STUDENT,
      token
    );
    return OK(res, user, "Password reset successfully.");
  } catch (error) {
    next(error);
  }
}

export async function changePasswordController(req, res, next) {
  const userId = req?.user?._id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return BAD(res, "Email, old password, and new password are required.");
  }
  try {
    const user = await AuthService.changePassword(
      oldPassword,
      newPassword,
      userId,
      UserType.STUDENT
    );
    if (!user) {
      return BAD(res, "Error changing password.");
    }

    return OK(res, user, "Password changed successfully.");
  } catch (error) {
    next(error);
  }
}
// controllers/studentController.js
export async function updateStudentController(req, res, next) {
  try {
    const userId = req.user._id; // Assumes user is authenticated
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

    // Fetch the existing user
    const existingStudent = await StudentService.findOne(userId);
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
      userId,
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
export default {
  signupController,
  loginController,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController,
  updateStudentController,
};
