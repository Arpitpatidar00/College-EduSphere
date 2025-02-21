import mongoose from "mongoose";
import CollegeModel from "../database/models/college.model.js";

class CollegeService {
  static instance = null;

  static getInstance() {
    if (!CollegeService.instance) {
      CollegeService.instance = new CollegeService();
    }
    return CollegeService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid college ID");
    }
    return CollegeModel.findById(id);
  }

  async findAll(pipeline = []) {
    return CollegeModel.aggregate(pipeline);
  }

  async findBy(key, value) {
    return CollegeModel.findOne({ [key]: value });
  }

  async create(collegeData) {
    const college = new CollegeModel(collegeData);
    return college.save();
  }

  async updateCollege(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid college ID");
    }
    return CollegeModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteCollege(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid college ID");
    }
    return CollegeModel.findByIdAndDelete(id);
  }

  async toggleCollegeActiveStatus(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid college ID");
    }
    const college = await CollegeModel.findById(id);
    if (!college) {
      throw new Error("College not found");
    }
    college.isActive = !college.isActive;
    return college.save();
  }
}

export const collegeService = CollegeService.getInstance();
