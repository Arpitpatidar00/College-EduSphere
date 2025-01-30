import mongoose from "mongoose";
import bcrypt from "bcrypt";

const collegeSchema = new mongoose.Schema(
  {
    institutionName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
      required: true,
    },
    socialMediaHandles: {
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      facebook: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    programsOffered: {
      type: [String],
      default: [],
    },
    departments: {
      type: [String],
      default: [],
    },
    follow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Follow",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: null,
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    announcements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement",
      },
    ],
    role: {
      type: String,
      default: "COLLEGE",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    dateJoined: {
      type: Date,
      default: Date.now,
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
