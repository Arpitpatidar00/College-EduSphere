import mongoose from "mongoose";
import UserModel from "../database/models/users.model.js";

class UserService {
  static instance = null;

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }
    return UserModel.findById(id);
  }

  async findAll(filter = {}) {
    return UserModel.find(filter);
  }

  async findBy(key, value) {
    return UserModel.findOne({ [key]: value });
  }

  async create(userData) {
    const user = new UserModel(userData);
    return user.save();
  }

  async updateUser(userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    return UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUser(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    return UserModel.findByIdAndDelete(userId);
  }

  async toggleUserActiveStatus(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.isActive = !user.isActive;
    return user.save();
  }

  async checkUserExist(key, value) {
    const exists = await UserModel.exists({ [key]: value });
    return !!exists;
  }
}

export default UserService.getInstance();
