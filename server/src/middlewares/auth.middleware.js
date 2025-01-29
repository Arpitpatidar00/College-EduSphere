import JwtServices from "../services/external/jwt.service.js";
import AdminModel from "../database/models/admin.model.js";
import UserModel from "../database/models/users.model.js";
import CollegeModel from "../database/models/college.model.js";

import { NOT_FOUND, UNAUTHORIZED } from "../lib/responseHelper.js";
import UserType from "../constants/userTypeEnum.js";

export const authMiddleware = async (req, res, next) => {
  const headToken = req.header("Authorization");
  const token = headToken?.replace("Bearer ", "");

  if (!token) {
    return UNAUTHORIZED(res, "Authorization token is required.");
  }

  try {
    const decoded = JwtServices.decodeToken(token);
    console.log(decoded);
    if (!decoded) {
      return UNAUTHORIZED(res, "Access denied: Invalid or expired token.");
    }

    let user;
    if (decoded.role === UserType.ADMIN) {
      user = await AdminModel.findById(decoded.id);
      if (!user) {
        return NOT_FOUND(res, "Admin not found.");
      }
      req.admin = user;
    } else if (decoded.role === UserType.COLLEGE) {
      user = await CollegeModel.findById(decoded.id);
      if (!user) {
        return NOT_FOUND(res, "College not found.");
      }
      req.user = user;
    } else if (decoded.role === UserType.USER) {
      user = await UserModel.findById(decoded.id);
      if (!user) {
        return NOT_FOUND(res, "User not found.");
      }
      req.user = user;
    } else {
      return UNAUTHORIZED(res, "Access denied: Invalid user role.");
    }

    next();
  } catch (error) {
    return UNAUTHORIZED(res, error, "An unexpected error occurred.");
  }
};

export const adminCheckMiddleware = (req, res, next) => {
  if (!req.admin) {
    return UNAUTHORIZED(res, "Forbidden: You do not have permission.");
  }
  next();
};
