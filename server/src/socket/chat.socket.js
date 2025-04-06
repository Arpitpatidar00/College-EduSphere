export const SocketEvents = Object.freeze({
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  USER_STATUS: "userStatus",
  GET_ACTIVE_USERS: "getActiveUsers",
  JOIN_CHAT: "joinChat",
  NEW_MESSAGE: "newMessage",
  MESSAGE_RECEIVED: "messageReceived",
  TYPING: "typing",
  MESSAGE_READ: "messageRead",
  CALL_USER: "callUser",
  CALL_REJECTED: "callRejected",
  CALL_ENDED: "callEnded",
  ICE_CANDIDATE: "iceCandidate",
  OFFER: "offer",
  ANSWER: "answer",
});

export function initializeSocket(io) {
  if (!io) {
    console.error("❌ Error: Socket.IO instance not provided!");
    return;
  }

  const activeUsers = new Map();

  io.on(SocketEvents.CONNECT, (socket) => {
    console.log(`✅ Socket connected: ${socket.id}`);
    const userId = socket.handshake.query.userId;
    if (!userId) {
      console.warn("❌ No userId provided, disconnecting socket.");
      return socket.disconnect(true);
    }

    activeUsers.set(userId, socket.id);
    console.log(`🟢 Registered user: ${userId} -> ${socket.id}`);

    io.emit(SocketEvents.USER_STATUS, { userId, isOnline: true });

    socket.on(SocketEvents.DISCONNECT, () => {
      activeUsers.delete(userId);
      console.log(`🔴 User disconnected: ${userId}`);
      io.emit(SocketEvents.USER_STATUS, { userId, isOnline: false });
    });

    // Handle chat events
    socket.on(SocketEvents.GET_ACTIVE_USERS, () => {
      socket.emit(SocketEvents.GET_ACTIVE_USERS, [...activeUsers.keys()]);
    });

    socket.on(SocketEvents.JOIN_CHAT, ({ conversationIds }) => {
      if (!Array.isArray(conversationIds)) return;
      conversationIds.forEach((id) => {
        // socket.join(id.toString());
        // console.log(`✅ User ${userId} joined room: ${id}`);
      });
    });
    socket.on(SocketEvents.NEW_MESSAGE, ({ message, conversationId }) => {
      if (!message || !conversationId) {
        console.log("❌ Missing message or conversationId");
        return;
      }
      console.log(
        `📩 Backend received message in ${conversationId}: ${message.content}`
      );
      // Broadcast the message to everyone in the room (except the sender)
      socket.to(conversationId.toString()).emit(SocketEvents.MESSAGE_RECEIVED, {
        message,
        conversationId,
      });
    });

    socket.on(
      SocketEvents.TYPING,
      ({ conversationId, userId, isGroup = false }) => {
        if (isGroup) {
          socket
            .to(conversationId.toString())
            .emit(SocketEvents.TYPING, { conversationId, userId });
        } else {
          const recipientSocketId = activeUsers.get(conversationId);
          if (recipientSocketId) {
            io.to(recipientSocketId).emit(SocketEvents.TYPING, {
              conversationId,
              userId,
            });
          }
        }
      }
    );

    // Added message read (seen) event handler
    socket.on(
      SocketEvents.MESSAGE_READ,
      ({ messageId, conversationId, userId }) => {
        socket
          .to(conversationId.toString())
          .emit(SocketEvents.MESSAGE_READ, { messageId, userId });
      }
    );

    // WebRTC call signals
    socket.on(SocketEvents.CALL_USER, ({ from, to, offer, type }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      io.to(receiverSocketId).emit(SocketEvents.OFFER, { from, offer, type });
    });

    socket.on(SocketEvents.ANSWER, ({ to, answer }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      io.to(receiverSocketId).emit(SocketEvents.ANSWER, { answer });
    });

    socket.on(SocketEvents.CALL_REJECTED, ({ to }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      io.to(receiverSocketId).emit(SocketEvents.CALL_REJECTED);
    });

    socket.on(SocketEvents.CALL_ENDED, ({ to }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      io.to(receiverSocketId).emit(SocketEvents.CALL_ENDED);
    });

    socket.on(SocketEvents.ICE_CANDIDATE, ({ to, candidate }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      io.to(receiverSocketId).emit(SocketEvents.ICE_CANDIDATE, { candidate });
    });
  });

  return io;
}
