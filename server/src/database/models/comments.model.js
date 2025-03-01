import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment text is required"],
      maxLength: [500, "Comment cannot exceed 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

CommentSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
    next();
  } else {
    next();
  }
});

export default mongoose.model("Comments", CommentSchema);
