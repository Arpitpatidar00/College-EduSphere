import axios from "axios";

const api = axios.create({
  // baseURL: process.env.VITE_BACKEND_URL,
  baseURL: "http://localhost:4000",
});

export default api;
