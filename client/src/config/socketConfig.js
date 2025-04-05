const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BACKEND_URL,
  SOCKET_URL: import.meta.env.REACT_APP_FRONTEND_URL,
  ENDPOINTS: {
    CREATE_DIRECT_CHAT: "/chat/direct",
    CREATE_GROUP_CHAT: "/chat/group",
    SEND_MESSAGE: "/chat/message",
    GET_MESSAGES: "/chat/messages",
  },
};

export default API_CONFIG;
