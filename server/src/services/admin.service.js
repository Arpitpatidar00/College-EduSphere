import mongoose from "mongoose";
import Admin from "../database/models/admin.model.js";

class AdminService {
  static instance = null;

  static getInstance() {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid admin ID");
    }
    return Admin.findById(id);
  }

  async findAll(filter = {}) {
    return Admin.find(filter);
  }

  async findBy(key, value) {
    return Admin.findOne({ [key]: value });
  }

  async create(adminData) {
    const admin = new Admin(adminData);
    return admin.save();
  }

  async updateAdmin(adminId, updateData) {
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      throw new Error("Invalid admin ID");
    }
    return Admin.findByIdAndUpdate(adminId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteAdmin(adminId) {
    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      throw new Error("Invalid admin ID");
    }
    return Admin.findByIdAndDelete(adminId);
  }

  async checkAdminExist(key, value) {
    const exists = await Admin.exists({ [key]: value });
    return !!exists;
  }
}

export default AdminService.getInstance();
