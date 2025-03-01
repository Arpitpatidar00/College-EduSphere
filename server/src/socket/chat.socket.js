// socket/chat.socket.js
import { Server } from "socket.io";
import { chatService } from "../services/chat.service.js";

export function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Store active users
  const activeUsers = new Map();

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // User joins their own room and conversation rooms
    socket.on("joinChat", async ({ userId, conversationIds }) => {
      socket.join(userId);
      conversationIds.forEach((id) => socket.join(id));
      activeUsers.set(userId, socket.id);

      // Update user's online status
      io.emit("userStatus", { userId, isOnline: true });
    });

    // Handle typing indicator
    socket.on("typing", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("userTyping", { userId });
    });

    // Handle message read
    socket.on("messageRead", async ({ messageId, userId }) => {
      const message = await chatService.markMessageAsRead(messageId, userId);
      io.to(message.conversationId).emit("messageStatusUpdate", {
        messageId,
        status: "read",
        seenBy: message.seenBy,
      });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const userId = [...activeUsers.entries()].find(
        ([_, socketId]) => socketId === socket.id
      )?.[0];

      if (userId) {
        activeUsers.delete(userId);
        io.emit("userStatus", { userId, isOnline: false });
      }
      console.log("Client disconnected:", socket.id);
    });
  });

  // Make io globally available
  global.io = io;
  return io;
}
