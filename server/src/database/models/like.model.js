import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userType",
        required: [true, "User ID is required"],
        index: true,
      },
    ],
    userType: {
      type: String,
      enum: ["Student", "College"],
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Likes", LikeSchema);

export default Like;
