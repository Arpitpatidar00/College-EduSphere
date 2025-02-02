import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "video", "file", "audio"],
      required: true,
    },
    content: {
      type: String, 
      required: true,
    },
    mediaUrl: {
      type: String, 
      default: null,
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isEdited: {
      type: Boolean,
      default: false, // Track if the message was edited
    },
    editedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

MessageSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
    next();
  } else {
    next();
  }
});

export default mongoose.model("Message", MessageSchema);
