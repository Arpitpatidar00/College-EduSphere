import { Server } from "socket.io";

/**
 * Enum for Socket Events - Ensures consistency and prevents typos.
 */
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
/**
 * Initializes the Socket.IO server and handles real-time events.
 * @param {Server} io - The Socket.IO instance.
 */
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

    // Notify all users that this user is online
    io.emit(SocketEvents.USER_STATUS, { userId, isOnline: true });

    socket.on(SocketEvents.DISCONNECT, () => {
      activeUsers.delete(userId);
      console.log(`🔴 User disconnected: ${userId}`);

      // Notify others that the user is offline
      io.emit(SocketEvents.USER_STATUS, { userId, isOnline: false });
    });

    // ✅ Get active users
    socket.on(SocketEvents.GET_ACTIVE_USERS, () => {
      socket.emit(SocketEvents.GET_ACTIVE_USERS, [...activeUsers.keys()]);
    });

    // ✅ Handle chat room joining
    socket.on(SocketEvents.JOIN_CHAT, ({ conversationIds }) => {
      if (!Array.isArray(conversationIds)) return;
      conversationIds.forEach((id) => socket.join(id.toString()));
      console.log(`📢 User ${userId} joined rooms: ${conversationIds}`);
    });

    // ✅ Handle new messages
    socket.on(SocketEvents.NEW_MESSAGE, ({ message, conversationId }) => {
      if (!message || !conversationId) return;
      console.log(`📩 New message in ${conversationId}: ${message}`);
      io.to(conversationId).emit(SocketEvents.MESSAGE_RECEIVED, {
        message,
        conversationId,
      });
    });

    // ✅ Handle WebRTC call initiation
    socket.on(SocketEvents.CALL_USER, ({ from, to, offer, type }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) {
        console.warn(`⚠️ User ${to} is not online.`);
        return;
      }
      console.log(`📞 CALL_USER: Sending OFFER from ${from} to ${to}`);
      io.to(receiverSocketId).emit(SocketEvents.OFFER, { from, offer, type });
    });

    // ✅ Handle call answering
    socket.on(SocketEvents.ANSWER, ({ to, answer }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      io.to(receiverSocketId).emit(SocketEvents.ANSWER, { answer });
    });

    // ✅ Handle call rejection
    socket.on(SocketEvents.CALL_REJECTED, ({ to }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      console.log(`🚫 CALL_REJECTED: ${userId} rejected call from ${to}`);
      io.to(receiverSocketId).emit(SocketEvents.CALL_REJECTED);
    });

    // ✅ Handle call ending
    socket.on(SocketEvents.CALL_ENDED, ({ to }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      console.log(`📴 CALL_ENDED: Call ended between ${userId} and ${to}`);
      io.to(receiverSocketId).emit(SocketEvents.CALL_ENDED);
    });

    // ✅ Handle ICE candidate exchange
    socket.on(SocketEvents.ICE_CANDIDATE, ({ to, candidate }) => {
      const receiverSocketId = activeUsers.get(to);
      if (!receiverSocketId) return;
      console.log(
        `❄️ ICE_CANDIDATE: Sending ICE candidate from ${userId} to ${to}`
      );
      io.to(receiverSocketId).emit(SocketEvents.ICE_CANDIDATE, { candidate });
    });
  });

  return io;
}
