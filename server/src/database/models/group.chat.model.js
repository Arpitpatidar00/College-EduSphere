// server/src/database/models/group.chat.model.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// DirectChatConversationSchema (unchanged)
const DirectChatConversationSchema = new Schema(
  {
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: "Student", required: true }],
      validate: {
        validator: (value) => value.length === 2,
        message: "Direct chat must have exactly 2 participants",
      },
      index: true,
    },
    college: { type: Schema.Types.ObjectId, ref: "College", required: false },
    lastMessage: { type: String, default: "", trim: true },
    unreadCounts: { type: Map, of: Number, default: () => new Map() },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const DirectChatConversation = mongoose.model(
  "DirectChatConversation",
  DirectChatConversationSchema
);

// GroupChatConversationSchema (unchanged)
const GroupChatConversationSchema = new Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "Student", required: true },
    ],
    isGroup: { type: Boolean, default: true, immutable: true },
    groupName: {
      type: String,
      required: [true, "Group name is required"],
      trim: true,
    },
    college: { type: Schema.Types.ObjectId, ref: "College", required: true },
    groupAdmins: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    lastMessage: { type: String, default: "", trim: true },
    unreadCounts: { type: Map, of: Number, default: () => new Map() },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const GroupChatConversation = mongoose.model(
  "GroupChatConversation",
  GroupChatConversationSchema
);

// MessageSchema (unchanged from your latest version)
const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      refPath: "conversationModel",
    },
    conversationModel: {
      type: String,
      required: true,
      enum: ["DirectChatConversation", "GroupChatConversation"],
      default: "DirectChatConversation",
    },
    senderId: {
      type: Schema.Types.ObjectId,
      refPath: "senderType",
      required: true,
      index: true,
    },
    senderType: { type: String, enum: ["Student", "College"], required: true },
    messageType: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "text",
    },
    content: { type: String, default: "", trim: true },
    media: [{ type: String, default: null, trim: true }],
    seenBy: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Message = mongoose.model("Message", MessageSchema);

export { DirectChatConversation, GroupChatConversation, Message };
