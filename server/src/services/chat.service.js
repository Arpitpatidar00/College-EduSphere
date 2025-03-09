// server/src/services/chat.service.js
import mongoose from "mongoose";
import {
  DirectChatConversation,
  GroupChatConversation,
  Message,
} from "../database/models/group.chat.model.js";

class ChatService {
  static instance = null;

  static getInstance() {
    if (!ChatService.instance) ChatService.instance = new ChatService();
    return ChatService.instance;
  }

  async findOrCreateDirectChat(participantIds, collegeId) {
    const participants = participantIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    let chat = await DirectChatConversation.findOne({
      participants: { $all: participants, $size: 2 },
      college: collegeId || null,
    });

    if (!chat) {
      chat = await DirectChatConversation.create({
        participants,
        college: collegeId || null,
        unreadCounts: new Map(participants.map((id) => [id.toString(), 0])),
      });
    }
    return chat;
  }

  async createGroupChat({ participants, groupName, creatorId, collegeId }) {
    const participantIds = participants.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const creatorObjectId = new mongoose.Types.ObjectId(creatorId);

    const chat = await GroupChatConversation.create({
      participants: participantIds,
      groupName,
      college: collegeId,
      groupAdmins: [creatorObjectId],
      unreadCounts: new Map(participantIds.map((id) => [id.toString(), 0])),
    });
    return chat;
  }

  async createMessage(messageData) {
    const {
      conversationId,
      senderId,
      senderType,
      messageType,
      content,
      media,
      isGroup,
    } = messageData;

    const message = await Message.create({
      conversationId,
      conversationModel: isGroup
        ? "GroupChatConversation"
        : "DirectChatConversation",
      senderId,
      senderType, // Required field
      messageType: messageType || "text",
      content: content || "",
      media: media || [],
    });

    const conversationModel = isGroup
      ? GroupChatConversation
      : DirectChatConversation;
    const conversation = await conversationModel.findById(conversationId);
    const recipients = conversation.participants.filter(
      (id) => id.toString() !== senderId.toString()
    );

    const updatedConversation = await conversationModel.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: content || "Media message",
        $set: { [`unreadCounts.${senderId}`]: 0 },
        $inc: recipients.reduce((acc, recipientId) => {
          acc[`unreadCounts.${recipientId}`] = 1;
          return acc;
        }, {}),
      },
      { new: true }
    );

    return { message, conversation: updatedConversation };
  }

  async getMessages(conversationId, limit = 50, skip = 0) {
    return await Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("senderId", "username firstName lastName profilePicture"); // Populates Student or College
  }

  async markMessageAsRead(messageId, studentId) {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { $addToSet: { seenBy: studentId }, status: "read" },
      { new: true }
    );

    const conversationModel =
      message.conversationModel === "GroupChatConversation"
        ? GroupChatConversation
        : DirectChatConversation;

    await conversationModel.findByIdAndUpdate(message.conversationId, {
      $set: { [`unreadCounts.${studentId}`]: 0 },
    });

    return message;
  }
}

export const chatService = ChatService.getInstance();
