import mongoose from "mongoose";
import CityModel from "../database/models/city.model.js";

class CityService {
  static instance = null;

  static getInstance() {
    if (!CityService.instance) {
      CityService.instance = new CityService();
    }
    return CityService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid city ID");
    }
    return CityModel.findById(id);
  }

  async findAll(pipeline = []) {
    return CityModel.aggregate(pipeline);
  }

  async findBy(key, value) {
    return CityModel.findOne({ [key]: value });
  }

  async create(cityData) {
    const city = new CityModel(cityData);
    return city.save();
  }

  async updateCity(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid city ID");
    }
    return CityModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteCity(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid city ID");
    }
    return CityModel.findByIdAndDelete(id);
  }

  async toggleCityActiveStatus(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid city ID");
    }
    const city = await CityModel.findById(id);
    if (!city) {
      throw new Error("City not found");
    }
    city.isActive = !city.isActive;
    return city.save();
  }
}

export default CityService.getInstance();
