// services/chat.service.js
import mongoose from "mongoose";
import {
  DirectChatConversation,
  GroupChatConversation,
  Message,
} from "../database/models/group.chat.model.js";

class ChatService {
  static instance = null;

  static getInstance() {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  // Direct Chat Methods
  async findOrCreateDirectChat(participantIds) {
    const participants = participantIds.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    let chat = await DirectChatConversation.findOne({
      participants: { $all: participants, $size: 2 },
    });

    if (!chat) {
      chat = await DirectChatConversation.create({
        participants,
        unreadCounts: new Map(participants.map((id) => [id.toString(), 0])),
      });
    }
    return chat;
  }

  // Group Chat Methods
  async createGroupChat(groupData) {
    const participants = groupData.participants.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const chat = await GroupChatConversation.create({
      ...groupData,
      participants,
      groupAdmins: [new mongoose.Types.ObjectId(groupData.creatorId)],
      unreadCounts: new Map(participants.map((id) => [id.toString(), 0])),
    });
    return chat;
  }

  // Message Methods
  async createMessage(messageData) {
    const message = await Message.create(messageData);
    const conversationModel = messageData.isGroup
      ? GroupChatConversation
      : DirectChatConversation;

    const conversation = await conversationModel.findByIdAndUpdate(
      messageData.conversationId,
      {
        lastMessage: message.content || "Media message",
        $inc: { [`unreadCounts.${messageData.sender}`]: 0 }, // Reset sender's count
        $inc: { [`unreadCounts.${messageData.recipients}`]: 1 }, // Increment others
      },
      { new: true }
    );

    return { message, conversation };
  }

  async getMessages(conversationId, limit = 50, skip = 0) {
    return Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("sender", "name");
  }

  async markMessageAsRead(messageId, userId) {
    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        $addToSet: { seenBy: userId },
        status: "read",
      },
      { new: true }
    );

    const conversationModel = message.conversationId.isGroup
      ? GroupChatConversation
      : DirectChatConversation;

    await conversationModel.findByIdAndUpdate(message.conversationId, {
      $set: { [`unreadCounts.${userId}`]: 0 },
    });

    return message;
  }
}

export const chatService = ChatService.getInstance();
