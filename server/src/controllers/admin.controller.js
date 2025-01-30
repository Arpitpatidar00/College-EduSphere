import AdminService from "../services/admin.service.js";
import AuthService from "../services/auth/auth.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import UserType from "../constants/userTypeEnum.js";

export async function signupController(req, res, next) {
  const { firstName, lastName, email, password, contactPhone, role } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !contactPhone ||
    !role
  ) {
    return BAD(
      res,
      "All fields (firstName, lastName, email, password, contactPhone, role) are required."
    );
  }

  try {
    const existingAdmin = await AdminService.findBy("email", email);
    if (existingAdmin) {
      return BAD(res, "An admin with this email already exists.");
    }

    const { admin, token } = await AuthService.signupWithEmail(
      {
        firstName,
        lastName,
        email,
        password,
        contactPhone,
        role,
      },
      UserType.ADMIN
    );
    if (!admin & !token) {
      return BAD(res, "Failed to create admin account.");
    }

    return OK(res, { token, admin }, "Admin created successfully.");
  } catch (error) {
    console.error("Error during admin signup:", error);
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return BAD(res, "Email and password are required.");
    }

    const { token, admin } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
      UserType.ADMIN
    );
    if (!admin & !token) {
      return BAD(res, "Failed to login admin.");
    }

    return OK(res, { admin, token }, "Admin login successful.");
  } catch (error) {
    next(error);
  }
}

export async function verifyEmailController(req, res, next) {
  const { token } = req.query;
  if (!token) {
    return BAD(res, "Verification token is required.");
  }

  try {
    const { admin } = await AuthService.verifyEmail(token, UserType.ADMIN);
    if (!admin) {
      return BAD(res, "Failed to verify email.");
    }
    return OK(res, { token, admin }, "Email verified successfully.");
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
    const result = await AuthService.forgotPassword(email, UserType.ADMIN);

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
    return BAD(res, "Token and new password are required.");
  }

  try {
    const admin = await AuthService.resetPassword(
      newPassword,
      UserType.ADMIN,
      token
    );
    if (!admin) {
      return BAD(res, "Failed to reset password.");
    }

    return OK(res, admin, "Password reset successfully.");
  } catch (error) {
    next(error);
  }
}

export async function changePasswordController(req, res, next) {
  const adminId = req?.user?._id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return BAD(res, "Old password and new password are required.");
  }

  try {
    const admin = await AuthService.changePassword(
      oldPassword,
      newPassword,
      adminId,
      UserType.ADMIN
    );
    if (!admin) {
      return BAD(res, "Failed to change password.");
    }
    return OK(res, admin, "Password changed successfully.");
  } catch (error) {
    next(error);
  }
}
