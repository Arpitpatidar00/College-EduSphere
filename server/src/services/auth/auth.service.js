/* eslint-disable no-undef */
import AdminService from "../admin.service.js";
import StudentService from "../student.service.js";
import { collegeService } from "../college.service.js";
import JwtService from "../external/jwt.service.js";
import SmsService from "../external/sms.service.js";
import { EMAIL_TEMPLATES_ID } from "../../constants/email.constants.js";
import EmailService from "../../services/external/email.service.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../lib/responseHelper.js";
import { generateOtpWithExpiry } from "../../utils/generateOtpWithExpiry.js";
import { SMS_TEMPLATES } from "../../constants/email.constants.js";

class AuthService {
  static async loginWithEmailAndPassword(email, password, role) {
    if (!email || !password || !role) {
      throw new BadRequestError("Email, password, and role are required.");
    }

    const Service = AuthService.getServiceByRole(role);
    const user = await Service.findBy("email", email);

    if (!user) throw new NotFoundError(`${role} not found.`);

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials.");

    const token = JwtService.generateAccessToken({
      id: user._id,
      email: user.email,
      role,
    });
    return { token, user };
  }

  static async signupWithEmail(details, role) {
    const Service = AuthService.getServiceByRole(role);
    const existingUser = await Service.findBy("email", details.email);
    if (existingUser)
      throw new BadRequestError(`${details.email} already exists.`);

    const user = await Service.create({ ...details, role, isVerified: false });
    if (!user) throw new BadRequestError(`${role} not found.`);

    const token = JwtService.generateAccessToken({
      id: user._id,
      email: user.email,
      role,
    });
    await EmailService.sendTemplatedEmail(
      user.email,
      EMAIL_TEMPLATES_ID.USER_VERIFICATION_EMAIL,
      {
        user_name: user.firstName || user.institutionName,
        verification_url: token,
      }
    );
    return { user, token };
  }

  static async verifyEmail(verificationToken, role) {
    const Service = AuthService.getServiceByRole(role);
    const decoded = JwtService.decodeToken(verificationToken);
    if (!decoded || !decoded.id) {
      throw new NotFoundError("User not found.");
    }

    const user = await Service.findBy("_id", decoded.id);
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
      role,
    });

    return { token, user };
  }

  static async loginWithMobileAndOtp(mobileNo, role) {
    const { otp, expiry } = generateOtpWithExpiry();
    const Service = AuthService.getServiceByRole(role);
    const user = await Service.findBy("mobileNo", mobileNo);
    if (!user) throw new NotFoundError("User not found.");

    user.AuthCode = otp;
    user.AuthCodeExpiry = expiry;
    await user.save();

    await SmsService.sendTemplatedMessage(mobileNo, SMS_TEMPLATES.OTP, {
      otp,
      expiry,
    });
  }

  static async verifyOtp(mobileNo, otp, role) {
    const Service = AuthService.getServiceByRole(role);
    const user = await Service.findBy("mobileNo", mobileNo);
    if (!user || user.AuthCode !== otp || user.AuthCodeExpiry < Date.now()) {
      throw new UnauthorizedError("Invalid or expired OTP.");
    }

    user.AuthCode = "";
    user.AuthCodeExpiry = 0;
    await user.save();

    const token = JwtService.generateAccessToken({
      id: user._id,
      mobileNo: user.mobileNo,
      role,
    });
    return { token, user };
  }

  static async forgotPassword(email, role) {
    const Service = AuthService.getServiceByRole(role);
    const user = await Service.findBy("email", email);
    if (!user) {
      throw new NotFoundError("User not found.");
    }
    const token = JwtService.generateAccessToken({
      id: user._id,
      email: user.email,
      role,
    });
    const resetUrl = `${process.env.BASE_URL || "https://your-default-url.com"}/reset-password?token=${token}`;
    await EmailService.sendTemplatedEmail(
      user.email,
      EMAIL_TEMPLATES_ID.PASSWORD_RESET_EMAIL,
      {
        user_name: user.firstName || user.institutionName,
        verification_url: resetUrl,
      }
    );
    return { message: "Password reset link sent." };
  }

  static async resetPassword(newPassword, role, token) {
    const Service = AuthService.getServiceByRole(role);
    const decoded = JwtService.decodeToken(token);
    if (!decoded || !decoded.id) throw new NotFoundError("User not found.");

    const user = await Service.findBy("_id", decoded.id);

    if (!user) throw new NotFoundError("User not found.");

    user.password = newPassword;
    await user.save();
  }

  static async changePassword(oldPassword, newPassword, userId, role) {
    const Service = AuthService.getServiceByRole(role);
    const user = await Service.findBy("_id", userId);
    if (!user) throw new NotFoundError("User not found.");

    const isOldPasswordValid = await user.comparePassword(oldPassword);
    if (!isOldPasswordValid)
      throw new UnauthorizedError("Incorrect old password.");

    user.password = newPassword;
    await user.save();
    return { message: "Password changed successfully." };
  }

  static getServiceByRole(role) {
    switch (role) {
      case "admin":
        return AdminService;
      case "college":
        return collegeService;
      case "student":
        return StudentService;
      default:
        throw new BadRequestError("Invalid role provided.");
    }
  }
}

export default AuthService;
