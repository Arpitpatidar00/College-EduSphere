// src/services/socket.js
import { io } from "socket.io-client";
import API_CONFIG from "../config/socketConfig";

class SocketService {
  static instance = null;
  socket = null;

  static getInstance() {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect(userId) {
    if (!this.socket) {
      this.socket = io(API_CONFIG.SOCKET_URL, {
        query: { userId },
        withCredentials: true, // If your backend uses credentials
      });

      this.socket.on("connect", () => {
        console.log("Connected to socket server:", this.socket.id);
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinConversation(conversationId) {
    if (this.socket) {
      this.socket.emit("joinChat", { conversationId });
    }
  }
}

export const socketService = SocketService.getInstance();
