import mongoose from "mongoose";
import StateModel from "../database/models/state.model.js";

class StateService {
  static instance = null;
  static getInstance() {
    if (!StateService.instance) {
      StateService.instance = new StateService();
    }
    return StateService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid state ID");
    }
    return StateModel.findById(id);
  }

  async findAll(pipeline = []) {
    return StateModel.aggregate(pipeline);
  }

  async findBy(key, value) {
    return StateModel.findOne({ [key]: value });
  }

  async create(stateData) {
    const state = new StateModel(stateData);
    return state.save();
  }

  async updateState(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid state ID");
    }
    return StateModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteState(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid state ID");
    }
    return StateModel.findByIdAndDelete(id);
  }

  async toggleStateActiveStatus(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid state ID");
    }
    const state = await StateModel.findById(id);
    if (!state) {
      throw new Error("State not found");
    }
    state.isActive = !state.isActive;
    return state.save();
  }
}

export default StateService.getInstance();
