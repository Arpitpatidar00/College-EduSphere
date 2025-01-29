import mongoose from "mongoose";
import bcrypt from "bcrypt";

const collegeSchema = new mongoose.Schema(
  {
    institutionName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    websiteURL: {
      type: String,
      default: "",
    },
    contactEmail: {
      type: String,
      default: "",
    },
    contactPhone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
      required: true,
    },
    socialMediaHandles: {
      type: [String],
      default: [],
    },
    programsOffered: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

collegeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

collegeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const CollegeModel = mongoose.model("College", collegeSchema);
export default CollegeModel;
