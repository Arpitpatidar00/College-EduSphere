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
      refPath: "senderType", // Use senderType to determine the ref model
      required: true,
    },
    senderType: {
      type: String,
      enum: ["Student", "College"], // Restrict to valid model names
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
        ref: "senderType",
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
