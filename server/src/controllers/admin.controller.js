import { OK, BAD } from "../lib/responseHelper.js";
import AuthService from "../services/auth/auth.service.js";
import AdminService from "../services/admin.service.js";
import UserType from "../constants/userTypeEnum.js";

export async function adminSignupController(req, res, next) {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return BAD(res, "Username, email, password, and role are required.");
  }

  try {
    const existingAdmin = await AdminService.findBy("email", email);
    if (existingAdmin) {
      return BAD(res, "An admin with this email already exists.");
    }

    const { user, token } = await AuthService.signupWithEmail(
      {
        username,
        email,
        password,
      },
      UserType.ADMIN
    );

    return OK(res, { user, token }, "Admin created successfully.");
  } catch (error) {
    console.error("Error during admin signup:", error);
    next(error);
  }
}

export async function adminLoginController(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return BAD(res, "Email and password are required.");
  }

  try {
    const { token, user } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
      UserType.ADMIN
    );

    return OK(res, { user, token }, "Admin login successful.");
  } catch (error) {
    next(error);
  }
}
