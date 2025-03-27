import mongoose from "mongoose";
import { FOLLOW_STATUS } from "../../constants/enum.js";

const FollowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userType",
      required: true,
      unique: true,
    },

    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userType",
        },
        status: {
          type: String,
          enum: Object.values(FOLLOW_STATUS),
          default: FOLLOW_STATUS.PENDING,
        },
        followedAt: { type: Date, default: Date.now },
      },
    ],
    following: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userType",
        },
        status: {
          type: String,
          enum: Object.values(FOLLOW_STATUS),
          default: FOLLOW_STATUS.REQUESTED,
        },
        followedAt: { type: Date, default: Date.now },
      },
    ],
    blacklist: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userType",
        },
        blockedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Follow", FollowSchema);
