// controllers/chat.controller.js
import { chatService } from "../services/chat.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { ObjectId } from "mongodb";

export async function createDirectChatController(req, res, next) {
  try {
    const { participantIds } = req.body;
    if (!participantIds || participantIds.length !== 2) {
      return BAD(res, null, "Exactly 2 participants required");
    }

    const chat = await chatService.findOrCreateDirectChat(participantIds);
    return OK(res, chat, "Direct chat retrieved/created successfully");
  } catch (error) {
    next(error);
  }
}

export async function createGroupChatController(req, res, next) {
  try {
    const { participants, groupName, creatorId } = req.body;
    if (!participants || !groupName || !creatorId) {
      return BAD(res, null, "Missing required fields");
    }

    const chat = await chatService.createGroupChat({
      participants,
      groupName,
      creatorId,
    });
    return OK(res, chat, "Group chat created successfully");
  } catch (error) {
    next(error);
  }
}

export async function sendMessageController(req, res, next) {
  try {
    const { conversationId, content, messageType, media } = req.body;
    const sender = req.user.id; // Assuming user ID comes from auth middleware

    const messageData = {
      conversationId: new ObjectId(conversationId),
      sender,
      messageType: messageType || "text",
      content: content || "",
      media: media || [],
    };

    const { message, conversation } =
      await chatService.createMessage(messageData);
    // Emit socket event here (implementation shown in socket section)
    global.io.to(conversationId).emit("newMessage", { message, conversation });

    return OK(res, message, "Message sent successfully");
  } catch (error) {
    next(error);
  }
}

export async function getMessagesController(req, res, next) {
  try {
    const { conversationId, limit, skip } = req.query;
    const messages = await chatService.getMessages(
      new ObjectId(conversationId),
      parseInt(limit) || 50,
      parseInt(skip) || 0
    );
    return OK(res, messages, "Messages retrieved successfully");
  } catch (error) {
    next(error);
  }
}
