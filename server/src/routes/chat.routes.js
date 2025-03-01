// routes/chat.routes.js
import express from "express";
import { chatController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply authMiddleware to all chat routes
router.use(authMiddleware);

// @direct-chat
router.post("/direct", chatController.createDirectChatController); // Create or get direct chat
router.post("/group", chatController.createGroupChatController); // Create group chat

// @messages
router.post("/message", chatController.sendMessageController); // Send a message
router.get("/messages", chatController.getMessagesController); // Get messages for a conversation

export default router;
