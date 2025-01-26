/* eslint-disable no-undef */
import debug from "debug";
import { createServer } from "http";

import app from "./app.js";

const port = process.env.PORT || 4000;
app.set("port", port);

const server = createServer(app);

// @ This is a middleware to accept any unknown route that is not in our current app.
app.use((req, res) => {
  res.status(500).json({
    code: false,
    message: "Invalid Api.",
  });
});

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
  debug(`\n\nDebug:\n>> Listening on ${bind}\n\n`);
};

server.on("error", onError);
server.on("listening", onListening);

// @Server started:
server.listen(port, () => {
  console.log(`\n\nServer Started:\n>> http://localhost:${port}\n`);
});
