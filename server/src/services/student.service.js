import mongoose from "mongoose";
import StudentModel from "../database/models/student.model.js";
import { ObjectId } from "mongodb";

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

  async findAll(pipeline = []) {
    return StudentModel.aggregate(pipeline);
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

    const updatedUser = await StudentModel.findOneAndUpdate(
      { _id: userId },
      { $set: updateData }, // Use $set for partial updates
      {
        new: true, // Return updated document
        runValidators: true, // Apply schema validations
      }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
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
  async updateStudentStatus(studentId, updateData) {
    return await StudentModel.findOneAndUpdate(
      { _id: new ObjectId(studentId) },
      { $set: updateData },
      { new: true } // Return updated document
    );
  }
}

export default StudentService.getInstance();
