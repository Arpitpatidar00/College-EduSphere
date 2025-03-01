import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * DirectChatConversation Schema
 * Represents a one-to-one conversation between exactly two users.
 */
const DirectChatConversationSchema = new Schema(
  {
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      validate: {
        validator: function (value) {
          return value.length === 2;
        },
        message: "Direct chat must have exactly 2 participants",
      },
    },
    // Stores a preview of the last message sent
    lastMessage: {
      type: String,
      default: "",
    },
    // Tracks unread message counts for each participant (e.g., { userId1: 2, userId2: 0 })
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

const DirectChatConversation = mongoose.model(
  "DirectChatConversation",
  DirectChatConversationSchema
);

/**
 * GroupChatConversation Schema
 * Represents a group conversation with more than 2 participants.
 */
const GroupChatConversationSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    // Flag to indicate this is a group chat (always true for this model)
    isGroup: {
      type: Boolean,
      default: true,
    },
    // Required group name for group chats
    groupName: {
      type: String,
      required: [true, "Group name is required for group chats"],
    },
    // Optional array of group admins (references to User)
    groupAdmins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Stores a preview of the last message sent
    lastMessage: {
      type: String,
      default: "",
    },
    // Tracks unread message counts for each participant
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);

const GroupChatConversation = mongoose.model(
  "GroupChatConversation",
  GroupChatConversationSchema
);

/**
 * Message Schema
 * Represents an individual message within a conversation.
 */
const MessageSchema = new Schema(
  {
    // This ID could refer to either a DirectChatConversation or GroupChatConversation
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Message type to support different media formats
    messageType: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "text",
    },
    // Text content of the message (if applicable)
    content: {
      type: String,
      default: "",
    },
    // Array to store media URLs when messageType is not 'text'
    media: [
      {
        type: String,
        default: null,
      },
    ],
    // Array of user IDs who have seen this message (read receipts)
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Message status for tracking delivery (sent, delivered, read)
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

export { DirectChatConversation, GroupChatConversation, Message };
