import AuthService from "../services/auth/auth.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { UserType } from "../constants/enum.js";
import { collegeService } from "../services/college.service.js";
import FollowService from "../services/follow.service.js";

export async function signupCollegeController(req, res, next) {
  const {
    institutionName,
    email,
    password,
    contactPhone,
    stateId,
    cityId,
    pinCode,
    countryId,
  } = req.body;

  if (
    !institutionName ||
    !email ||
    !password ||
    !contactPhone ||
    !stateId ||
    !cityId ||
    !pinCode ||
    !countryId
  ) {
    return BAD(
      res,
      "All fields (institutionName, email, password, contactPhone, stateId, cityId, pinCode, countryId) are required."
    );
  }

  try {
    const existingCollege = await collegeService.findBy("email", email);
    if (existingCollege) {
      return BAD(res, "A college with this email already exists.");
    }

    const { user, token } = await AuthService.signupWithEmail(
      {
        institutionName,
        email,
        password,
        contactPhone,
        stateId,
        cityId,
        pinCode,
        countryId,
      },
      UserType.COLLEGE
    );

    if (!user || !token) {
      return BAD(res, "College cannot be created.");
    }
    const followCollection = await FollowService.createFollowDocument(user._id);

    const updateData = {
      follow: followCollection._id,
    };

    const updatedCollege = await collegeService.updateUser(user.id, updateData);

    return OK(
      res,
      { token, user: updatedCollege },
      "College created successfully."
    );
  } catch (error) {
    console.error("Error during college signup:", error);
    next(error);
  }
}

export async function loginCollegeController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return BAD(res, "Email and password are required.");
    }

    const { user, token } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
      UserType.COLLEGE
    );
    if (!token && !user) {
      return BAD(res, "Login failed.");
    }

    return OK(res, { user, token }, "Login successful.");
  } catch (error) {
    next(error);
  }
}

export async function verifyCollegeEmailController(req, res, next) {
  const { token } = req.query;
  if (!token) {
    return BAD(res, "Email and verification code are required.");
  }

  try {
    const { college } = await AuthService.verifyEmail(token, UserType.COLLEGE);
    if (!college) {
      return BAD(res, "Email verification failed.");
    }
    return OK(res, null, "Email verified successfully.");
  } catch (error) {
    next(error);
  }
}

export async function forgotCollegePasswordController(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return BAD(res, "Email is required.");
  }

  try {
    const result = await AuthService.forgotPassword(email, UserType.COLLEGE);

    if (result) {
      return OK(res, null, result.message);
    }

    return BAD(res, "Error sending password reset link.");
  } catch (error) {
    next(error);
  }
}

export async function resetCollegePasswordController(req, res, next) {
  const { newPassword } = req.body;
  const { token } = req.query;

  if (!token || !newPassword) {
    return BAD(res, "Token and new password are required.");
  }

  try {
    await AuthService.resetPassword(newPassword, UserType.COLLEGE, token);

    return OK(res, null, "Password reset successfully.");
  } catch (error) {
    next(error);
  }
}

export async function changeCollegePasswordController(req, res, next) {
  const collegeId = req?.user?._id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return BAD(res, "Old password and new password are required.");
  }
  try {
    const college = await AuthService.changePassword(
      oldPassword,
      newPassword,
      collegeId,
      UserType.COLLEGE
    );
    if (!college) {
      return BAD(res, "Error changing password.");
    }
    return OK(res, null, "Password changed successfully.");
  } catch (error) {
    next(error);
  }
}
