import dotenv from "dotenv";

dotenv.config({ path: ".env" }); // MENTION THE INSTANCE HERE TO RUN AS DEFAULT

dotenv.config({
  path: `.env.${process.env.environment?.trim()}`,
});
