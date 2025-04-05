import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "love", "wow", "sad", "angry"],
      required: true,
      default: "like",
    },
    reactedAt: {
      type: Date,
      default: Date.now,
    },
    mediaIndex: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const ViewerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
    mediaIndex: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const MediaSchema = new mongoose.Schema(
  {
    mediaUrl: {
      type: String,
      required: true,
      trim: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    duration: {
      type: Number, // Duration in seconds (useful for videos)
      min: 0,
      default: 0,
    },
    order: {
      type: Number, // To maintain sequence of media items
      required: true,
      min: 0,
    },
    thumbnailUrl: {
      type: String, // Optional thumbnail for videos
      trim: true,
    },
  },
  { _id: false }
);

const StorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    media: {
      type: [MediaSchema],
      required: true,
      validate: {
        validator: (array) => array.length > 0 && array.length <= 10, // Limit to 10 media items
        message: "Story must have 1-10 media items",
      },
    },
    viewers: {
      type: [ViewerSchema],
      default: [],
    },
    reactions: {
      type: [ReactionSchema],
      default: [],
    },
    privacy: {
      type: String,
      enum: ["public", "followers", "collegeOnly"],
      default: "public",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
      index: { expireAfterSeconds: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to get total reactions count
StorySchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

// Indexes for better query performance
StorySchema.index({ userId: 1, createdAt: -1 });
StorySchema.index({ expiresAt: 1 });
StorySchema.index({ "media.order": 1 });

// Pre-save hook to ensure unique order values
StorySchema.pre("save", function (next) {
  if (this.isModified("media")) {
    this.media.forEach((item, index) => {
      item.order = index;
    });
  }
  next();
});

// Method to get views per media item
StorySchema.methods.getMediaViews = function () {
  const viewsByMedia = {};
  this.media.forEach((_, index) => {
    viewsByMedia[index] = this.viewers.filter(
      (v) => v.mediaIndex === index
    ).length;
  });
  return viewsByMedia;
};

const StoryModel = mongoose.model("Story", StorySchema);
export default StoryModel;
