import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    postType: {
      type: String,
      enum: [
        "hackathons",
        "achievement",
        "project",
        "event",
        "report",
        "other",
      ],
      required: true,
    },
    media: [
      {
        type: String,
        default: null,
      },
    ],
    coverImage: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userType",
      required: [true, "User ID is required"],
    },

    tags: [
      {
        type: String,
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
    eventDetails: {
      type: String,
      default: "",
    },
    eventDate: {
      type: Date,
    },
    location: {
      type: String,
      default: "",
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    trending: {
      type: Boolean,
      default: false,
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
    uiTheme: {
      type: String,
      default: "modern",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userType",
      default: null,
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate rank and trending status automatically based on engagement metrics
PostSchema.pre("save", function (next) {
  // Calculate score components with customizable weights
  const viewsScore = this.totalViews * 0.1;
  const likesScore = this.totalLikes ? this.totalLikes.length * 1 : 0;
  const commentsScore = this.totalComments ? this.totalComments.length * 2 : 0;
  const shareScore = this.shareCount * 1.5;

  // Compute overall rank as a weighted sum of the scores
  this.rank = viewsScore + likesScore + commentsScore + shareScore;

  // Set trending flag if the rank exceeds a specified threshold (adjust as necessary)
  this.trending = this.rank > 50;

  next();
});

export default mongoose.model("Post", PostSchema);
