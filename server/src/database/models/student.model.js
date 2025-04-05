import mongoose from "mongoose";
import bcrypt from "@node-rs/bcrypt";

const StudentModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    enrollmentId: {
      type: String,
      required: true,
      unique: true,
    },
    interest: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    collegeVerified: {
      type: Boolean,
      default: false,
    },
    follow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Follow",
      default: null,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    bio: {
      type: String,
      maxLength: [500, "Bio cannot be longer than 500 characters"],
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "USER",
    },

    dateJoined: {
      type: Date,
      default: Date.now,
    },
    socialLinks: {
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      facebook: { type: String, default: "" },
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    reports: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    privacySettings: {
      visibility: {
        type: String,
        enum: ["public", "private", "friends"],
        default: "public",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

StudentModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

StudentModel.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Students", StudentModel);
