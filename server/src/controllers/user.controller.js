import UserService from "../services/user.service.js";
import AuthService from "../services/auth/auth.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import UserType from "../constants/userTypeEnum.js";

export async function signupController(req, res, next) {
  const { firstName, lastName, email, dob, password } = req.body;

  if (!firstName || !lastName || !email || !dob || !password) {
    return BAD(
      res,
      "All fields (firstName, lastName, email, dob, password) are required."
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
      },
      UserType.USER
    );

    return OK(res, { token, user }, "User created successfully.");
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
}

// Login Controller
export async function loginController(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return BAD(res, "Email and password are required.");
  }

  try {
    const { token, user } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
      UserType.USER
    );

    return OK(res, { user, token }, "Login successful.");
  } catch (error) {
    next(error);
  }
}
