import AdminService from "../services/admin.service.js";
import AuthService from "../services/auth/auth.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { UserType } from "../constants/enum.js";

export async function signupController(req, res, next) {
  const { firstName, lastName, email, password, contactPhone } = req.body;

  if (!firstName || !lastName || !email || !password || !contactPhone) {
    return BAD(
      res,
      "All fields (firstName, lastName, email, password, contactPhone) are required."
    );
  }

  try {
    const existingAdmin = await AdminService.findBy("email", email);
    if (existingAdmin) {
      return BAD(res, "An admin with this email already exists.");
    }

    const { token, user } = await AuthService.signupWithEmail(
      {
        firstName,
        lastName,
        email,
        password,
        contactPhone,
      },
      UserType.ADMIN
    );
    if (!user & !token) {
      return BAD(res, "Failed to create admin account.");
    }

    return OK(res, { user, token }, "Admin created successfully.");
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

    const { token, user } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
      UserType.ADMIN
    );
    if (!user & !token) {
      return BAD(res, "Failed to login admin.");
    }

    return OK(res, { user, token }, "Admin login successful.");
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
    const { user } = await AuthService.verifyEmail(token, UserType.ADMIN);
    if (!user) {
      return BAD(res, "Failed to verify email.");
    }
    return OK(res, { token, user }, "Email verified successfully.");
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
    await AuthService.forgotPassword(email, UserType.ADMIN);

    return OK(res, null, "Password reset link sent to your email.");
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
    await AuthService.resetPassword(newPassword, UserType.ADMIN, token);

    return OK(res, null, "Password reset successfully.");
  } catch (error) {
    next(error);
  }
}

export async function changePasswordController(req, res, next) {
  const adminId = req?.admin?._id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return BAD(res, "Old password and new password are required.");
  }

  try {
    const user = await AuthService.changePassword(
      oldPassword,
      newPassword,
      adminId,
      UserType.ADMIN
    );
    if (!user) {
      return BAD(res, "Failed to change password.");
    }
    return OK(res, user, "Password changed successfully.");
  } catch (error) {
    next(error);
  }
}
