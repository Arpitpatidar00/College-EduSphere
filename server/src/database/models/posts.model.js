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
      enum: ["hackathon", "achievement", "project", "other"],
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
    hackathonDetails: {
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

PostSchema.methods.incrementLikes = async function () {
  this.likes += 1;
  await this.save();
};

PostSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
};

PostSchema.methods.addComment = async function (commentId) {
  this.comments.push(commentId);
  await this.save();
};

PostSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
    next();
  } else {
    next();
  }
});

export default mongoose.model("Post", PostSchema);
