import { io } from "socket.io-client";

/**
 * Enum-like structure for Socket Events.
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

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;
/**
 * Manages real-time socket interactions.
 */
class SocketService {
  /**
   * Initializes socket connection for a user.
   * @param {string} userId - Unique identifier for the user.
   */
  constructor(userId) {
    if (!userId)
      throw new Error("❌ User ID is required for socket connection.");

    this.userId = userId;
    this.socket = io(SOCKET_URL, {
      query: { userId },
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    this.registerUser = this.registerUser.bind(this);
    this.setupSocketListeners();
  }

  /**
   * ✅ Registers the user with the server upon connection.
   */
  registerUser() {
    console.log(`📡 Registering user ${this.userId}`);
    this.socket.emit("register", { userId: this.userId });
  }

  /**
   * ✅ Set up socket event listeners.
   */
  setupSocketListeners() {
    this.socket.on(SocketEvents.CONNECT, () => {
      console.log(`✅ Connected as ${this.userId}`);
      this.registerUser();
    });

    this.socket.on(SocketEvents.DISCONNECT, (reason) => {
      console.warn(`⚠️ Disconnected (${reason}): ${this.userId}`);
    });

    this.socket.on("connect_error", (error) =>
      console.error(`❌ Socket error: ${error.message}`)
    );
  }

  /**
   * ✅ Listen for user status updates.
   */
  listenToUserStatus(callback) {
    if (typeof callback !== "function") return;
    this.socket.off(SocketEvents.USER_STATUS);
    this.socket.on(SocketEvents.USER_STATUS, callback);
  }

  /**
   * ✅ Fetch active users.
   */
  getActiveUsers(callback) {
    if (typeof callback !== "function") return;
    this.socket.emit(SocketEvents.GET_ACTIVE_USERS);
    this.socket.off(SocketEvents.GET_ACTIVE_USERS);
    this.socket.on(SocketEvents.GET_ACTIVE_USERS, callback);
  }

  /**
   * ✅ Listen for incoming messages.
   */
  listenToMessages(callback) {
    if (typeof callback !== "function") return;
    this.socket.off(SocketEvents.MESSAGE_RECEIVED);
    this.socket.on(SocketEvents.MESSAGE_RECEIVED, callback);
  }
  /**
   * ✅ Listen for typing indicator.
   */
  listenToTyping(callback) {
    if (typeof callback !== "function") return;
    this.socket.off(SocketEvents.TYPING);
    this.socket.on(SocketEvents.TYPING, callback);
  }

  /**
   * Notify other users when typing.
   * @param {string} conversationId - The room or userId.
   * @param {boolean} isGroup - Set to true if this is a group chat.
   */
  sendTypingNotification(conversationId, isGroup = false) {
    if (!conversationId) return;
    this.socket.emit(SocketEvents.TYPING, {
      conversationId,
      userId: this.userId,
      isGroup,
    });
  }
  /**
   * Send a new message.
   */
  sendMessage(message, conversationId) {
    if (!message || !conversationId) return;
    console.log(`📩 Sending message to ${conversationId}:`, message);
    this.socket.emit(SocketEvents.NEW_MESSAGE, { message, conversationId });
  }
  /**
   * Disconnect the socket and remove listeners.
   */
  disconnect() {
    console.log("🔌 Disconnecting socket...");
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }

  /**
   * ✅ Handles WebRTC events for audio/video calls.
   * @param {RTCPeerConnection} peerConnection
   * @param {object} remoteStreamRef - React ref for remote stream.
   * @param {object} callHandlers - Callback functions.
   */
  handleCallEvents(peerConnection, remoteStreamRef, callHandlers) {
    if (!peerConnection) return;

    const { onOffer, onCallRejected, onCallEnded } = callHandlers;

    this.socket.off(SocketEvents.OFFER);
    this.socket.on(SocketEvents.OFFER, ({ from, offer, type }) => {
      console.log(`📥 Incoming Call: from ${from} - Type: ${type}`);
      onOffer({ from, offer, type });
    });

    this.socket.off(SocketEvents.ANSWER);
    this.socket.on(SocketEvents.ANSWER, ({ answer }) => {
      console.log("📥 Received Answer:", answer);
      peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    this.socket.off(SocketEvents.CALL_REJECTED);
    this.socket.on(SocketEvents.CALL_REJECTED, () => {
      console.log("🚫 Call Rejected");
      onCallRejected();
    });

    this.socket.off(SocketEvents.CALL_ENDED);
    this.socket.on(SocketEvents.CALL_ENDED, () => {
      console.log("📴 Call Ended");
      onCallEnded();
    });

    this.socket.off(SocketEvents.ICE_CANDIDATE);
    this.socket.on(SocketEvents.ICE_CANDIDATE, ({ candidate }) => {
      console.log("📥 Received ICE Candidate:", candidate);
      if (candidate) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    // ✅ Fix: Ensure remote video stream is assigned properly
    peerConnection.ontrack = (event) => {
      if (event.streams.length > 0 && remoteStreamRef?.current) {
        console.log("📡 Receiving Remote Stream");
        remoteStreamRef.current.srcObject = event.streams[0]; // Assign the remote stream
      }
    };
  }

  /**
   * ✅ Initiate a call.
   */
  callUser(toUserId, offer, type) {
    if (!toUserId || toUserId === this.userId) {
      console.warn("❌ Invalid call attempt.");
      return;
    }
    console.log(`📞 Calling ${toUserId}...`);
    this.socket.emit(SocketEvents.CALL_USER, {
      from: this.userId,
      to: toUserId,
      offer,
      type,
    });
  }
  /**
   * Join chat rooms.
   * @param {string[]} conversationIds
   */
  joinChat(conversationIds) {
    if (!Array.isArray(conversationIds)) return;
    this.socket.emit(SocketEvents.JOIN_CHAT, { conversationIds });
  }

  /**
   * ✅ End a call.
   */
  endCall(toUserId) {
    if (!toUserId) return;
    console.log(`📴 Ending call with ${toUserId}...`);
    this.socket.emit(SocketEvents.CALL_ENDED, { to: toUserId });
  }
}

export const createSocketService = (userId) => new SocketService(userId);
