import mongoose from "mongoose";
import CountryModel from "../database/models/country.model.js";

class CountryService {
  static instance = null;

  static getInstance() {
    if (!CountryService.instance) {
      CountryService.instance = new CountryService();
    }
    return CountryService.instance;
  }

  async findOne(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid country ID");
    }
    return CountryModel.findById(id);
  }

  async findAll(pipeline = []) {
    const data = CountryModel.aggregate(pipeline);
    return data;
  }

  async findBy(key, value) {
    return CountryModel.findOne({ [key]: value });
  }

  async create(countryData) {
    const country = new CountryModel(countryData);
    return country.save();
  }

  async updateCountry(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid country ID");
    }
    return CountryModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteCountry(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid country ID");
    }
    return CountryModel.findByIdAndDelete(id);
  }

  async toggleCountryActiveStatus(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid country ID");
    }
    const country = await CountryModel.findById(id);
    if (!country) {
      throw new Error("Country not found");
    }
    country.isActive = !country.isActive;
    return country.save();
  }
}

export const countryService = CountryService.getInstance();
