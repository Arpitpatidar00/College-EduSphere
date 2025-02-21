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

// @import routes
import studentRoutes from "./routes/student.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import auhtcollegeRoutes from "./routes/auth.college.routes.js";

import collegeRoutes from "./routes/college.routes.js";
import locationRoutes from "./routes/location.routes.js";

// import userRoutes from "./routes/userProfile.routes.js";
import postRoutes from "./routes/post.routes.js";

// @Start App
const app = express();
const { json } = pkg;
const __dirname = dirname(new URL(import.meta.url).pathname);

// @ Setting up Middlewares and App Config
app.use(
  express.static(join(__dirname, "../public"), {
    setHeaders(res, _path) {
      res.set("x-timestamp", Date.now().toString());
    },
  })
);

// - It helps to protect Node. js Express apps from common security threats such as Cross-Site Scripting (XSS) and click-jacking attacks.
app.use(helmet());

app.use(
  morgan("common", {
    skip: (req) => req.originalUrl.startsWith("/socket"),
  })
);

// enabling CORS for some specific origins only.
// let corsOptions = {
//   origin: process.env.ORIGIN,
// };

// - to handle cors policy
const corsOptions = {
  origin: process.env.ORIGIN, // Replace with your frontend domain
  optionsSuccessStatus: 200,
};
app.use(cors());

// - parse frontend payloads
app.use(urlencoded({ extended: false }));
app.use(json());

// - The middleware will attempt to compress response bodies for all request that traverse through the middleware,
app.use(compression());

// @routes:

app.use("/auth/user", studentRoutes);
app.use("/auth/admin", adminRoutes);
app.use("/auth/college", auhtcollegeRoutes);
app.use("/college", collegeRoutes);

app.use("/location", locationRoutes);

// app.use("/profile", userRoutes);
app.use("/post", postRoutes);

export default app;
