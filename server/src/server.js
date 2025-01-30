/* eslint-disable no-undef */
import debug from "debug";
import { createServer } from "http";

import app from "./app.js";

const log = debug("server"); // Define debug namespace

const port = process.env.PORT || 4000;
app.set("port", port);

const server = createServer(app);

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`\n\nError:\n>> ${bind} requires elevated privileges\n\n`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`\n\nError:\n>> ${bind} is already in use\n\n`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${port}`;
  log(`Listening on ${bind}`);
};

// Attach error and listening event handlers
server.on("error", onError);
server.on("listening", onListening);

// Start server
server.listen(port, () => {
  console.log(`\n\nServer Started:\n>> http://localhost:${port}\n`);
});

// ✅ Middleware for handling unknown routes (should be after `server.listen`)

app.use((error, res, next) => {
  console.error(`\n\nError:\n>> ${error.message}\n\n`);

  res.status(error.status || 500).json({
    code: false,
    message: error.message || "Something went wrong!",
  });
});
