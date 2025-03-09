// server/src/controllers/chat.controller.js
import { chatService } from "../services/chat.service.js";
import { OK, BAD } from "../lib/responseHelper.js";
import { ObjectId } from "mongodb";

export async function createDirectChatController(req, res, next) {
  try {
    const { participantIds, collegeId } = req.body;
    if (!participantIds || participantIds.length !== 2) {
      return BAD(res, null, "Exactly 2 participant IDs required");
    }
    const chat = await chatService.findOrCreateDirectChat(
      participantIds,
      collegeId
    );
    return OK(res, chat, "Direct chat retrieved or created successfully");
  } catch (error) {
    next(error);
  }
}

export async function createGroupChatController(req, res, next) {
  try {
    const { participants, groupName, creatorId, collegeId } = req.body;
    if (!participants || !groupName || !creatorId || !collegeId) {
      return BAD(
        res,
        null,
        "Participants, group name, creator ID, and college ID are required"
      );
    }
    const chat = await chatService.createGroupChat({
      participants,
      groupName,
      creatorId,
      collegeId,
    });
    return OK(res, chat, "Group chat created successfully");
  } catch (error) {
    next(error);
  }
}

export async function sendMessageController(req, res, next) {
  try {
    const { conversationId, content, messageType, media, isGroup } = req.body;
    const senderId = req.user.id; // From auth middleware
    const senderType = req.user.role === "student" ? "Student" : "College"; // Assume role from auth

    if (!conversationId || !senderId) {
      return BAD(res, null, "Conversation ID and sender ID are required");
    }

    const messageData = {
      conversationId: new ObjectId(conversationId),
      senderId,
      senderType,
      messageType: messageType || "text",
      content: content || "",
      media: media || [],
      isGroup: isGroup || false,
    };

    const { message, conversation } =
      await chatService.createMessage(messageData);
    global.io
      .to(conversationId.toString())
      .emit("newMessage", { message, conversation }); // Match frontend event

    return OK(res, message, "Message sent successfully");
  } catch (error) {
    next(error);
  }
}

export async function getMessagesController(req, res, next) {
  try {
    const { conversationId, limit, skip } = req.query;
    if (!conversationId) {
      return BAD(res, null, "Conversation ID is required");
    }
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
