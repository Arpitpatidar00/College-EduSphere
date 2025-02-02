import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: [1000, "Description cannot exceed 1000 characters"],
    },
    postType: {
      type: String,
      enum: ["hackathons", "achievement", "project", "other"],
      required: [true, "Post type is required"],
    },
    media: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    tags: [
      {
        type: String,
        maxLength: [50, "Tag cannot be longer than 50 characters"],
      },
    ],
    achievements: {
      type: String,
      default: "",
    },
    projectDetails: {
      type: String,
      default: "",
    },
    hackathonsDetails: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    totalLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    totalViews: {
      type: Number,
      default: 0,
    },
    totalComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    shareCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      enum: ["education", "career", "technology", "personal", "other"],
      default: "other",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

PostSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
    next();
  } else {
    next();
  }
});

export default mongoose.model("Post", PostSchema);
