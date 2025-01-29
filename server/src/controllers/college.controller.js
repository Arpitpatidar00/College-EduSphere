import { OK, BAD } from "../lib/responseHelper.js";
import AuthService from "../services/auth/auth.service.js";
import CollegeService from "../services/college.service.js";
import UserType from "../constants/userTypeEnum.js";

// College Registration (Signup)
export async function collegeSignupController(req, res, next) {
  const {
    institutionName,
    email,
    password,
    description,
    websiteURL,
    contactEmail,
    contactPhone,
    location,
    socialMediaHandles,
    programsOffered,
  } = req.body;

  if (
    !institutionName ||
    !email ||
    !password ||
    !description ||
    !websiteURL ||
    !contactEmail ||
    !contactPhone ||
    !location ||
    !socialMediaHandles ||
    !programsOffered
  ) {
    return BAD(res, "All fields are required for registration.");
  }

  try {
    const existingCollege = await CollegeService.findBy("email", email);
    if (existingCollege) {
      return BAD(res, "A college with this email already exists.");
    }

    const { user, token } = await AuthService.signupWithEmail(
      {
        institutionName,
        email,
        password,
        description,
        websiteURL,
        contactEmail,
        contactPhone,
        location,
        socialMediaHandles,
        programsOffered,
      },
      UserType.COLLEGE
    );

    return OK(res, { user, token }, "College created successfully.");
  } catch (error) {
    next(error);
  }
}

export async function collegeLoginController(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return BAD(res, "Email and password are required.");
  }

  try {
    const { token, user } = await AuthService.loginWithEmailAndPassword(
      email,
      password,
      UserType.COLLEGE
    );

    return OK(res, { user, token }, "College login successful.");
  } catch (error) {
    next(error);
  }
}
