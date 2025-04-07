/* eslint-disable no-undef */
// @import configs
import "./config/dotenv.config.js";
import "./database/db.connection.js";

// @import dependencies
import express, { urlencoded } from "express";
import pkg from "body-parser";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { initializeSocket } from "./socket/chat.socket.js";

// @import routes
import authStudentRoutes from "./routes/auth.student.routes.js";
import studentRoutes from "./routes/student.routes.js";

import adminRoutes from "./routes/admin.routes.js";
import authCollegeRoutes from "./routes/auth.college.routes.js";
import collegeRoutes from "./routes/college.routes.js";
import locationRoutes from "./routes/location.routes.js";
import postRoutes from "./routes/post.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import storiesRoutes from "./routes/story.routes.js";
import likesRoutes from "./routes/like.routes.js";
import commentsRoutes from "./routes/comment.routes.js";
import followRoutes from "./routes/follow.routes.js";
import activeLocation from "./routes/student.location.route.js";

// @Start App
const app = express();
const { json } = pkg;

// Fix for `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create HTTP server and initialize Socket.IO
const httpServer = createServer(app);
initializeSocket(httpServer);

// @ Setting up Middlewares and App Config

// Serve static files correctly
app.use(
  "/public",
  express.static(join(__dirname, "public"), {
    setHeaders(res) {
      res.set("x-timestamp", Date.now().toString());
    },
  })
);

// Serve uploads folder correctly
app.use("/public", express.static(join(__dirname, "../public")));

// Security middleware
app.use(helmet());

app.use(
  morgan("common", {
    skip: (req) => req.originalUrl.startsWith("/socket"),
  })
);

// - to handle CORS policy
// const corsOptions = {
//   origin: process.env.BASE_URL, // Replace with your frontend domain
//   optionsSuccessStatus: 200,
//   credentials: true, // Allow credentials for Socket.IO
// };
app.use(cors());

// - parse frontend payloads
app.use(urlencoded({ extended: false }));
app.use(json());

// - The middleware will attempt to compress response bodies for all requests
app.use(compression());

// @routes:
app.use("/auth/student", authStudentRoutes);
app.use("/auth/admin", adminRoutes);
app.use("/auth/college", authCollegeRoutes);
app.use("/college", collegeRoutes);
app.use("/student", studentRoutes);

app.use("/location", locationRoutes);
app.use("/post", postRoutes);
app.use("/chat", chatRoutes);
app.use("/stories", storiesRoutes);
app.use("/likes", likesRoutes);
app.use("/comments", commentsRoutes);
app.use("/follow", followRoutes);
app.use("/active-location", activeLocation);

export default app;
