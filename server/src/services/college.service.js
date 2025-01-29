import CollegeModel from "../database/models/college.model.js";

class CollegeService {
  static async findBy(field, value) {
    return CollegeModel.findOne({ [field]: value });
  }

  static async create(details) {
    const newCollege = new CollegeModel(details);
    return await newCollege.save();
  }
}

export default CollegeService;
