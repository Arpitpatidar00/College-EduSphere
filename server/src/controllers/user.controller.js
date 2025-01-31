import UserService from "../services/user.service.js";
import AuthService from "../services/auth/auth.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import UserType from "../constants/userTypeEnum.js";

export async function signupController(req, res, next) {
  const { firstName, lastName, email, dob, password, course, collegeId } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !dob ||
    !password ||
    !course ||
    !collegeId
  ) {
    return BAD(
      res,
      "All fields (firstName, lastName, email, dob, password, course,collegeId) are required."
    );
  }

  try {
    const existingUser = await UserService.findBy("email", email);
    if (existingUser) {
      return BAD(res, "A user with this email already exists.");
    }

    const { user, token } = await AuthService.signupWithEmail(
      {
        firstName,
        lastName,
        email,
        dob,
        password,
        course,
        collegeId,
      },
      UserType.USER
    );

    if (!user & !token) {
      return BAD(res, "Failed to create user.");
    }
    return OK(res, { token, user }, "User created successfully.");
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return BAD(res, "Email, password, and role are required.");
    }

    const { token, user } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
      UserType.USER
    );

    if (!user & !token) {
      return BAD(res, "Failed to login.");
    }
    return OK(res, { user, token }, "Login successful.");
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
    const { user } = await AuthService.verifyEmail(token, UserType.USER);

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
    const result = await AuthService.forgotPassword(email, UserType.USER);

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
      UserType.USER,
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
      UserType.USER
    );
    if (!user) {
      return BAD(res, "Error changing password.");
    }

    return OK(res, user, "Password changed successfully.");
  } catch (error) {
    next(error);
  }
}
