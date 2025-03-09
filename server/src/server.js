/* eslint-disable no-undef */
import debug from "debug";
import { createServer } from "http";
import { initializeSocket } from "./socket/chat.socket.js"; // Import socket initialization
import app from "./app.js";
import { Server } from "socket.io";

const log = debug("server");
const port = process.env.PORT || 4000;
app.set("port", port);

const server = createServer(app);

// Initialize Socket.IO with CORS settings
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
initializeSocket(io);

/**
 * Handle server errors
 */
const onError = (error) => {
  if (error.syscall !== "listen") throw error;

  const bind =
    typeof server.address() === "string"
      ? `Pipe ${server.address()}`
      : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`\n🚨 Error: ${bind} requires elevated privileges!\n`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`\n🚨 Error: ${bind} is already in use!\n`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Handle successful server startup
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `Pipe ${addr}` : `Port ${port}`;
  log(`✅ Server is listening on ${bind}`);
  console.log(`Server Started: http://localhost:${port}🚀`);
};

// Attach event handlers
server.on("error", onError);
server.on("listening", onListening);

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.error(`\n❌ API Error: ${error.message}\n`);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

// Start server
server.listen(port);
