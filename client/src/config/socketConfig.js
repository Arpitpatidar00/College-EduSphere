// src/config/apiConfig.js
const API_CONFIG = {
  BASE_URL: "http://localhost:4000",
  SOCKET_URL: "http://localhost:4000",
  ENDPOINTS: {
    CREATE_DIRECT_CHAT: "/chat/direct",
    CREATE_GROUP_CHAT: "/chat/group",
    SEND_MESSAGE: "/chat/message",
    GET_MESSAGES: "/chat/messages",
  },
};

export default API_CONFIG;
