import mongoose from "mongoose";
import StudentModel from "../database/models/student.model.js";

class StudentService {
  static instance = null;

  static getInstance() {
    if (!StudentService.instance) {
      StudentService.instance = new StudentService();
    }
    return StudentService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }
    return StudentModel.findById(id);
  }

  async findAll(filter = {}) {
    return StudentModel.find(filter);
  }

  async findBy(key, value) {
    return StudentModel.findOne({ [key]: value });
  }

  async create(userData) {
    const user = new StudentModel(userData);
    return user.save();
  }

  async updateUser(userId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    return StudentModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUser(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    return StudentModel.findByIdAndDelete(userId);
  }

  async toggleUserActiveStatus(userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    const user = await StudentModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.isActive = !user.isActive;
    return user.save();
  }

  async checkUserExist(key, value) {
    const exists = await StudentModel.exists({ [key]: value });
    return !!exists;
  }
}

export default StudentService.getInstance();
