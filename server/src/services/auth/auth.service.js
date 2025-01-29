/* eslint-disable no-undef */
import AdminService from "../admin.service.js";
import UserService from "../user.service.js";
import CollegeService from "../college.service.js";
import JwtService from "../external/jwt.service.js";
import SmsService from "../external/sms.service.js";
import UserModel from "../../database/models/users.model.js";
import { EMAIL_TEMPLATES_ID } from "../../constants/email.constants.js";
import EmailService from "../../services/external/email.service.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../../lib/responseHelper.js";
import { generateOtpWithExpiry } from "../../utils/generateOtpWithExpiry.js";
import { SMS_TEMPLATES } from "../../constants/email.constants.js";

class AuthService {
  static async loginWithEmailAndPassword(email, password, role) {
    let Service;

    if (!email || !password || !role) {
      throw new BadRequestError("Email, password, and role are required.");
    }

    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else if (role === "USER") Service = UserService;
    else throw new BadRequestError("Invalid role provided.");

    const user = await Service.findBy("email", email);
    if (!user) {
      throw new NotFoundError(`${role} not found.`);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials provided.");
    }

    const token = JwtService.generateAccessToken({
      id: user._id,
      email: user.email,
      role,
    });

    return { token, user };
  }

  static async signupWithEmail(details, role) {
    let Service;
    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else Service = UserService;

    const existingUser = await Service.findBy("email", details.email);
    if (existingUser)
      throw new BadRequestError(
        `${details.email ?? "unknown resource"} already exists.`
      );

    const user = await Service.create({ ...details, role, isVerified: false });

    const token = JwtService.generateAccessToken({
      id: user._id,
      email: user.email,
      role,
    });
    await EmailService.sendTemplatedEmail(
      user.email,
      EMAIL_TEMPLATES_ID.USER_VERIFICATION_EMAIL,
      { user_name: user.firstName, verification_url: token }
    );
    return { user, token };
  }

  static async verifyEmail(verificationToken, role) {
    let Service;
    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else Service = UserService;
    const decoded = await JwtService.decodeToken(verificationToken);

    if (!decoded || !decoded.id) {
      throw new NotFoundError("User not found.");
    }

    const user = await Service.findById(decoded.id);
    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (user.verified) {
      throw new BadRequestError("Email is already verified.");
    }

    user.verified = true;
    await user.save();

    const token = JwtService.generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return { token, user };
  }

  static async loginWithMobileAndOtp(mobileNo, role) {
    const { otp, expiry } = generateOtpWithExpiry();
    let Service;
    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else Service = UserService;

    let user = await Service.findBy("mobileNo", mobileNo);
    if (!user) throw new NotFoundError("User not found.");

    if (user instanceof UserModel) {
      user.AuthCode = otp;
      user.AuthCodeExpiry = expiry;
      await user.save();
    } else {
      throw new InternalServerError(
        "User is not an instance of the User model"
      );
    }

    await SmsService.sendTemplatedMessage(mobileNo, SMS_TEMPLATES.OTP, {
      otp,
      expiry,
    });
  }

  static async verifyOtp(mobileNo, otp, role) {
    let Service;
    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else Service = UserService;

    const user = await Service.findBy("mobileNo", mobileNo);
    if (!user || user.AuthCode !== otp || user.AuthCodeExpiry < Date.now()) {
      throw new UnauthorizedError(
        "The OTP provided is invalid or has expired."
      );
    }

    if (user instanceof UserModel) {
      user.AuthCode = "";
      user.AuthCodeExpiry = 0;
      await user.save();
    } else {
      throw new InternalServerError(
        "User is not an instance of the User model"
      );
    }

    const token = JwtService.generateAccessToken({
      id: user._id,
      mobileNo: user.mobileNo,
      role,
    });
    return { token, user };
  }

  static async resendOtp(mobileNo, role) {
    const { otp, expiry } = generateOtpWithExpiry();
    let Service;
    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else Service = UserService;

    const user = await Service.findBy("mobileNo", mobileNo);
    if (!user) throw new NotFoundError("User not found.");

    if (user instanceof UserModel) {
      user.AuthCode = otp;
      user.AuthCodeExpiry = expiry;
      await user.save();
    } else {
      throw new InternalServerError(
        "User is not an instance of the User model"
      );
    }

    await SmsService.sendTemplatedMessage(mobileNo, SMS_TEMPLATES.OTP, {
      otp,
      expiry,
    });
  }

  static async forgotPassword(email, role) {
    let Service;
    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else Service = UserService;

    const user = await Service.findBy("email", email);

    if (!user) throw new NotFoundError("User not found.");

    const token = JwtService.generateAccessToken({
      id: user._id,
      email: user.email,
      role,
    });
    const baseUrl = process.env.BASE_URL || "https://your-default-url.com";

    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    await EmailService.sendTemplatedEmail(
      user.email,
      EMAIL_TEMPLATES_ID.PASSWORD_RESET_EMAIL,
      { user_name: user.firstName, verification_url: resetUrl }
    );

    return { success: true, message: "Password reset link sent successfully." };
  }

  static async resetPassword(newPassword, role, token) {
    let Service;
    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else Service = UserService;

    const decoded = await JwtService.decodeToken(token);
    if (!decoded || !decoded.id) {
      throw new NotFoundError("User not found.");
    }

    const user = await Service.findBy("_id", decoded.id);

    if (!user) throw new NotFoundError("User not found.");

    user.password = newPassword;
    await user.save();
  }

  static async changePassword(oldPassword, newPassword, userId, role) {
    let Service;
    if (role === "ADMIN") Service = AdminService;
    else if (role === "COLLEGE") Service = CollegeService;
    else Service = UserService;

    const user = await Service.findBy("_id", userId);
    if (!user) throw new NotFoundError("User not found.");

    const isOldPasswordValid = await user.comparePassword(oldPassword);
    if (!isOldPasswordValid) {
      throw new UnauthorizedError("Old password is incorrect.");
    }

    user.password = newPassword;
    await user.save();

    return { message: "Password changed successfully." };
  }
}

export default AuthService;
