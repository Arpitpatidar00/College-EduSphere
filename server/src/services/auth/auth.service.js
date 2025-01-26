/* eslint-disable no-undef */
import AdminService from "../admin.service.js";
import UserService from "../user.service.js";
import JwtService from "../external/jwt.service.js";
import SmsService from "../external/sms.service.js";
import EmailService from "../external/email.service.js";
import UserModel from "../../database/models/users.model.js";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "../../lib/responseHelper.js";
import { generateOtpWithExpiry } from "../../utils/generateOtpWithExpiry.js";
import {
  EMAIL_TEMPLATES_ID,
  SMS_TEMPLATES,
} from "../../constants/email.constants.js";

class AuthService {
  static async loginWithEmailAndPassword(email, password, role) {
    const Service = role === "ADMIN" ? AdminService : UserService;

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

  static async loginWithMobileAndOtp(mobileNo) {
    const { otp, expiry } = generateOtpWithExpiry();
    let user = await UserService.findBy("mobileNo", mobileNo);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (user instanceof UserModel) {
      user.AuthCode = otp;
      user.AuthCodeExpiry = expiry;
      await user.save();
    } else {
      throw new InternalServerError(
        "User is not an instance of the User model"
      );
    }

    await SmsService.sendTemplatedMessage("+1234567890", SMS_TEMPLATES.OTP, {
      otp,
      expiry,
    });
  }

  static async signupWithEmail(details, role) {
    const Service = role === "ADMIN" ? AdminService : UserService;

    const existingUser = await Service.findBy("email", details.email);
    if (existingUser) {
      throw new BadRequestError(
        `${details.email ?? "unknown resource"} already exists.`
      );
    }

    const user = await Service.create({ ...details, role });

    const token = JwtService.generateAccessToken({
      id: user._id,
      email: user.email,
      role,
    });

    // const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    // await EmailService.sendTemplatedEmail(
    //   user.email,
    //   EMAIL_TEMPLATES_ID.VERIFY_EMAIL,
    //   {
    //     link: verificationLink,
    //     user_name: user.username,
    //   }
    // );

    return { user, token };
  }

  static async signupWithMobile(mobileNo) {
    const { otp, expiry } = generateOtpWithExpiry();
    await UserService.create({
      mobileNo,
      AuthCode: otp,
      AuthCodeExpiry: expiry,
    });

    await SmsService.sendTemplatedMessage(mobileNo, SMS_TEMPLATES.OTP, {
      otp,
      expiry,
    });
  }

  static async verifyOtp(mobileNo, otp) {
    const user = await UserService.findBy("mobileNo", mobileNo);

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
      role: "RETAIL" || "WHOLESALE",
    });
    return { token, user };
  }

  static async resendOtp(mobileNo) {
    const { otp, expiry } = generateOtpWithExpiry();
    const user = await UserService.findBy("mobileNo", mobileNo);
    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (user instanceof UserModel) {
      user.AuthCode = otp;
      user.AuthCodeExpiry = expiry;
      await user.save();
    } else {
      throw new InternalServerError(
        "User is not an instance of the User model"
      );
    }
    await SmsService.sendTemplatedMessage("+1234567890", SMS_TEMPLATES.OTP, {
      otp,
      expiry,
    });
  }

  static async forgotPassword(mobileNo) {
    const user = await UserService.findBy("mobileNo", mobileNo);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const { otp, expiry } = generateOtpWithExpiry();
    user.AuthCode = otp;
    user.AuthCodeExpiry = expiry;
    await user.save();

    await SmsService.sendTemplatedMessage(mobileNo, SMS_TEMPLATES.OTP, {
      otp,
      expiry,
    });
  }
  static async verifyPassword(enteredPassword, storedPassword) {
    const isPasswordValid = await bcrypt.compare(
      enteredPassword,
      storedPassword
    );
    return isPasswordValid;
  }

  static async resetPassword(mobileNo, otp, newPassword) {
    const user = await UserService.findBy("mobileNo", mobileNo);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    if (user.AuthCode !== otp || user.AuthCodeExpiry < Date.now()) {
      throw new UnauthorizedError(
        "The OTP provided is invalid or has expired."
      );
    }

    user.password = newPassword;
    user.AuthCode = "";
    user.AuthCodeExpiry = 0;

    await user.save();
  }
}

export default AuthService;
